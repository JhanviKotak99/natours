/*eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51ObIXoSIEBhQYjdVjhh9pe1AmqWqlQlbzJJZNx3CeSaDFZKhVaflGTrFdpGXtwf4B5BoOTJkcuO3elp4qEThEDMH008YqHxDFb',
    );
    console.log('in book tour method');
    //1) get checkout session from server
    const session = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    });
    console.log(session);

    //2)create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
