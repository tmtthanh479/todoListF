import { NotificationManager } from "react-notifications";

export const Alerterror = (title) => {
  NotificationManager.error(title, "Error", 5000);
};

export const Alertwarning = (title) => {
  NotificationManager.warning(title, "Warning");
};

export const Alertsuccess = (title) => {
  NotificationManager.success(title, "Success");
};

export const Alertinfo = (title) => {
  NotificationManager.info(title);
};
