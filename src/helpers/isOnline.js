import axios from 'axios';
import { quotesAPI } from '../constants';

const isOnline = async () => {
  try {
    await axios.get(quotesAPI);
  } catch (error) {
    if (!error.response) {
      return false;
    }
  }
  return true;

  // await axios
  //   .get(quotesAPI)
  //   .then()
  //   .catch((err) => {
  //     if (!err.response) {
  //       return false;
  //     }
  //   });
  // return true;
};

export default isOnline;
