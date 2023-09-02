import  Home  from "./components/Home/Home";
import  Notes  from "./components/Notes/Notes";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/notes',
    element: <Notes />
  },
  
];

export default AppRoutes;
