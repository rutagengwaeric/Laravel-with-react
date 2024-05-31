import{createBrowserRouter} from 'react-router-dom';
import Login from './views/Login.jsx';
import Register from './views/Register.jsx';
import User from './views/Users.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import UserForm from './views/UserForm.jsx';


const router  = createBrowserRouter ([

    {
        path : '/',
        element : <DefaultLayout />,
        children :[
            {
                path : '/users',
                element : <User />
            },
            {
                path : '/users/new',
                element : <UserForm key="UserCreate"/>
            },
            {
                path : '/users/:id',
                element : <UserForm key="UserUpdate"/>
            },


        ]
    },
    {
        path : '/',
        element : <GuestLayout />,
        children: [
            {
                path : '/login',
                element : <Login />
            },
            {
                path : '/register',
                element : <Register />
            }
        ]
    },

]);

export default router ;
