import { defineStore, acceptHMRUpdate } from "pinia";
import { getQueryString } from '@/utils/common';

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    authToken: getQueryString("authToken"), // 小程序带过来 token
    userId: getQueryString("userId"), // customerId
    // userId: 51000673,
    sourceEquipment: getQueryString("sourceEquipment"), // 设备来源 app pad miniProgram
    padEntrance: getQueryString("padEntrance"), // pad端入口 检测 examine（包括空，兼容pad端老版本app） 档案中心 record
    weChatShare: getQueryString("weChatShare"), // 0 未分享 1 已分享
    miniProgramEntrance: getQueryString("miniProgramEntrance"), // 小程序端入口 检测 examine 默认 空
    getCustomerName: "",
    getCustomerMobile: "",
    getOS: getQueryString("os"), // 操作系统 ios android

    // 喜报 app gpt 埋点
    companyID: getQueryString("companyID"), // 公司ID
    company_name: getQueryString("company_name"), // 公司名称
    user_equipNum: getQueryString("user_equipNum"), // 用户设备号
    xibaoRole: getQueryString("xibaoRole"), // 喜报角色
    user_ID: getQueryString("user_ID"), // 喜报账号
  }),
  getters: {},
  actions: {
    setCustomerName(val) {
      sessionStorage.setItem("getCustomerName", val);
      this.getCustomerName = val;
    },
    setCustomerMobile(val) {
      sessionStorage.setItem("getCustomerMobile", val.slice(-4));
      this.getCustomerMobile = val.slice(-4);
    },
  },
});