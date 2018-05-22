import { createReducer } from '../createReducer';
import {
  CREATE_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT
} from '../../actions/event/constants';

const initialState = [
	{
		id: '1',
		title: 'Trip to Tower of London',
		date: "2018-09-18",
		category: 'culture',
		description: 'Hello UK',
		city: 'London, UK',
		venue: "Tower",
		hostedBy: "Bob",
		hostPhotoURL: 'https://randomuser.me/api/portraits/men/21.jpg',
		attendees: [
			{
				id: 'a',
				name: "Bob",
				photoURL: 'https://randomuser.me/api/portraits/men/21.jpg'
			},
			{
				id: 'b',
				name: "Tom",
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
			}
		]
	}
];;


export const createEvent = (state, payload) => {
  return [...state, Object.assign({}, payload.event)];
}

export const updateEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.event.id),
    Object.assign({}, payload.event)
  ]
}

export const deleteEvent = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.eventId)
  ]
}

export default createReducer(
  initialState, {
    [CREATE_EVENT]: createEvent,
    [UPDATE_EVENT]: updateEvent,
    [DELETE_EVENT]: deleteEvent
  }
)