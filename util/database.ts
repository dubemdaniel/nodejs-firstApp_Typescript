import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "dubem",
  password: "your_password",
  database: "first-app",
});
 
export default sequelize