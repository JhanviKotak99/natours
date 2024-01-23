class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //1A) FILTERING
    //now, if along with all tours we want to apply filter via query
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...this.queryString };

    //BUILDING QUERY
    //excluded fields because we need to stop users using these parameters in query param asthey might give an error
    const excludedField = ['page', 'sort', 'limit', 'fields'];
    excludedField.forEach((el) => delete queryObj[el]);

    //1B) ADVANCE FIILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      //need to create mongoose equivalent like
      //query.sort('price -ratingsAverage');

      const sortBy = this.queryString.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    //meaning we dont want every fields in data, but just limited like price, name, duration
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // limit 5 meaning one page haas 5 records only
    //page 3 means page 3 of total request having limit quanitity fields
    //eg: 50 records... 10 is limit hence total 5 pages and hence limit 10, page 3 means 21-30 records

    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;

    //page=3&limit=10.. means skip 20 records.. skip 0-10, 11-20.. show 21-30
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
