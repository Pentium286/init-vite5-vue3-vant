import qs from 'qs';
import axiosInstance from './request';
import { showToast } from 'vant';

const request = axiosInstance.instance;

export default {
  get(url, params = {}, tips = {}, extra = {}, isShowError = true) {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'get',
        url,
        params
      };
      config = extra ? Object.assign(config, extra) : config;
      request(config).then(res => {

        // TODO:单独处理
        if (url.indexOf("getNursingDetail") > -1) {
          resolve(res);
        }

        if (res.success) {
          if (tips.successTip) {
            showToast({
              message: tips.successTip,
              duration: 3000,
              className: 'toastRequest',
            });
          }
          resolve(res);
        } else {
          if (isShowError || tips.errorTip) {
            showToast({
              message: tips.errorTip || res.message,
              duration: 3000,
            });
          }

        }
      }).catch(err => {
        reject(err);
      });
    });
  },
  post(url, params = {}, tips, extra) {
    return new Promise((resolve, reject) => {
      let config = {
        method: 'post',
        url,
        data: params
      };
      config = extra ? Object.assign(config, extra) : config;
      request(config).then(res => {
        if (res.success) {
          if (tips.successTip) {
            showToast({
              message: tips.successTip,
              duration: 3000,
            });
          }
          resolve(res);
        } else if (tips.errorTip || res.message) {
          showToast({
            message: tips.errorTip || res.message,
            duration: 3000,
          });
        }
      }).catch(err => {
        reject(err);
      });
    });
  }
};