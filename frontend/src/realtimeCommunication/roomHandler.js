import { setOpenRoom } from '../store/actions/roomActions';
import store from '../store/store';

export const createNewRoom = () => {
	store.dispatch(setOpenRoom(true, true));
};
