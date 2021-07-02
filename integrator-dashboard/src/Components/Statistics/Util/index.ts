import { CameraStats, Site, Camera, SiteStats } from "../../Interfaces";

export const getSiteStats = (siteData: Site[], cameraStats: CameraStats[]) => {
  console.log("cameraStats -> ", cameraStats);
  console.log("SiteData -> ", siteData);

  let siteStat: SiteStats[] = [];
  siteData.forEach((site) => {
    let obj = { site_name: site.site_name, alert: 0, total_requests: 0 };
    site.cameras.forEach((camera: Camera) => {
      let exist = cameraStats.find(
        (stat) => stat.smtp_email === camera.smtp_user_name
      );
      if (exist) {
        obj.alert += exist.alert;
        obj.total_requests += exist.request_count;
      }
    });
    siteStat.push(obj);
  });
  return siteStat;
};
