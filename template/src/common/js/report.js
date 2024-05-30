import { isClient, clientLog } from "./client";
import "./analytics";
let u = "https://receiver-metis.infeng.site/encode/web";

const analyticsInstance = (appId) => {
	return new window["PureAnalytics"]({
		reportUrl: u,
		appId: appId || "anyJS-components",
		strict: false
	});
};

const report = (params, appId) => {
	if (isClient()) {
		clientLog(params);
	} else {
		let json = {
			...params,
			eventName: params.eventId,
			pveCur: params.pve_cur
		};
		delete json.eventId;
		delete json.pve_cur;
		analyticsInstance(appId).report(json);
	}
};

const reportExposure = (componentName, appId, portal) => {
  console.log(componentName, appId, portal)
	report(
		{
			eventId: "show_ve",
			pve_cur: `/${componentName}/0/0`,

			portal: portal,
			url: window.location.href
		},
		appId
	);
};

export { report, reportExposure };
