import { Layout } from "react-admin";
import { MyMenu } from "./Menu";

export const CustomLayout = (props) => <Layout {...props} menu={MyMenu} />;
