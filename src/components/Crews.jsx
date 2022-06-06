import { useReducer } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_USERS } from "./CrewTable";

const ADD_USER = gql`
  mutation AddUser($name: String!, $rocket: String!) {
    insert_users(objects: { name: $name, rocket: $rocket }) {
      returning {
        id
        name
      }
    }
  }
`;

const Form = () => {
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [
      GET_USERS,
    ],
  });

  const UPDATE_NAME = "UPDATE_NAME";
  const UPDATE_ROCKET = "UPDATE_ROCKET";

  const initialState = {
    name: "",
    rocket: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case UPDATE_NAME:
        return {
          ...state,
          name: action.name,
        };
      case UPDATE_ROCKET:
        return {
          ...state,
          rocket: action.rocket,
        };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        addUser({ variables: { name: state.name, rocket: state.rocket } });
      }}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Crew
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="PAX Name"
          onChange={(e) =>
            dispatch({
              type: UPDATE_NAME,
              name: e.target.value,
            })
          }
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Rocket
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Rocket Name"
          onChange={(e) =>
            dispatch({
              type: UPDATE_ROCKET,
              rocket: e.target.value,
            })
          }
        />
        <p className="text-red-500 text-xs italic">Please Input Name.</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
          type="submit"
        >
          submit
        </button>
      </div>
    </form>
  );
};


const Crews = () => {
  return(
    <div>
      <div className="flex justify-end">
        <button className="uppercase border px-2 py-1">add crew</button>
      </div>
      <div className="hidden">
        <Form />
      </div>
    </div>
  )
}
export default Crews;