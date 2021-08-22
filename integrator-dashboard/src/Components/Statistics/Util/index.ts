import { CameraStats, Site, Camera, SiteStats, Group, GroupStats, Integrator, IntegratorStats } from "../../Interfaces";

export const getSiteStats = (siteData: Site[], cameraStats: CameraStats[]) => {
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

export const getGroupStats = (groupData: Group[], cameraStats: CameraStats[]) => {
  let groupStat: GroupStats[] = [];
  groupData.forEach((group) => {
    let obj = { group_name: group.group_name, alert: 0, total_requests: 0 };
    group.cameras.forEach((camera: Camera) => {
      let exist = cameraStats.find(
        (stat) => stat.smtp_email === camera.smtp_user_name
      );
      if (exist) {
        obj.alert += exist.alert;
        obj.total_requests += exist.request_count;
      }
    });
    groupStat.push(obj);
  });
  return groupStat;
};

export const getIntegratorStats = (integratorData: Integrator[], cameraStats: CameraStats[]) => {
  let integratorStat: IntegratorStats[] = [];
  integratorData.forEach((integrator) => {
    let obj = { name: integrator.name, alert: 0, total_requests: 0 };
    integrator.cameras.forEach((camera: Camera) => {
      let exist = cameraStats.find(
        (stat) => stat.smtp_email === camera.smtp_user_name
      );
      if (exist) {
        obj.alert += exist.alert;
        obj.total_requests += exist.request_count;
      }
    });
    integratorStat.push(obj);
  });
  return integratorStat;
};