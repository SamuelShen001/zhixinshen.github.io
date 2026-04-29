/*
  Zhixin Shen
  ITMD 541 - Graduate Student
  Lab 6 - Sunrise Sunset Dashboard

  This file handles user interaction and API requests.
  这个文件负责用户交互和 API 数据请求。
*/

// Use an IIFE to avoid global variable pollution.
// 使用 IIFE，避免变量污染全局作用域。
(function () {
    "use strict";
  
    // API base URL / API 基础地址
    const API_BASE_URL = "https://api.sunrisesunset.io/json";
  
    // Get HTML elements / 获取页面元素
    const locationSelect = document.querySelector("#locationSelect");
    const searchBtn = document.querySelector("#searchBtn");
    const currentLocationBtn = document.querySelector("#currentLocationBtn");
    const messageBox = document.querySelector("#messageBox");
  
    const locationTitle = document.querySelector("#locationTitle");
    const timezoneText = document.querySelector("#timezoneText");
  
    // Today elements / 今天的数据元素
    const todayDate = document.querySelector("#todayDate");
    const todaySunrise = document.querySelector("#todaySunrise");
    const todaySunset = document.querySelector("#todaySunset");
    const todayDawn = document.querySelector("#todayDawn");
    const todayDusk = document.querySelector("#todayDusk");
    const todayDayLength = document.querySelector("#todayDayLength");
    const todaySolarNoon = document.querySelector("#todaySolarNoon");
  
    // Tomorrow elements / 明天的数据元素
    const tomorrowDate = document.querySelector("#tomorrowDate");
    const tomorrowSunrise = document.querySelector("#tomorrowSunrise");
    const tomorrowSunset = document.querySelector("#tomorrowSunset");
    const tomorrowDawn = document.querySelector("#tomorrowDawn");
    const tomorrowDusk = document.querySelector("#tomorrowDusk");
    const tomorrowDayLength = document.querySelector("#tomorrowDayLength");
    const tomorrowSolarNoon = document.querySelector("#tomorrowSolarNoon");
  
    // Show message to user / 给用户显示提示信息
    function showMessage(text, type) {
      messageBox.textContent = text;
      messageBox.className = "message-box";
  
      if (type) {
        messageBox.classList.add(type);
      }
    }
  
    // Reset dashboard when error happens / 出错时重置面板，避免显示错误数据
    function resetDashboard() {
      locationTitle.textContent = "Location Not Selected";
      timezoneText.textContent = "Time zone will appear here after search.";
  
      todayDate.textContent = "Date: --";
      todaySunrise.textContent = "--";
      todaySunset.textContent = "--";
      todayDawn.textContent = "--";
      todayDusk.textContent = "--";
      todayDayLength.textContent = "--";
      todaySolarNoon.textContent = "--";
  
      tomorrowDate.textContent = "Date: --";
      tomorrowSunrise.textContent = "--";
      tomorrowSunset.textContent = "--";
      tomorrowDawn.textContent = "--";
      tomorrowDusk.textContent = "--";
      tomorrowDayLength.textContent = "--";
      tomorrowSolarNoon.textContent = "--";
    }
  
    // Build API URL / 生成 API 请求地址
    function buildApiUrl(latitude, longitude, dateValue) {
      return `${API_BASE_URL}?lat=${latitude}&lng=${longitude}&date=${dateValue}`;
    }
  
    // Fetch sunrise sunset data / 请求日出日落数据
    async function fetchSunData(latitude, longitude, dateValue) {
      const response = await fetch(buildApiUrl(latitude, longitude, dateValue));
  
      // If network response fails / 如果网络请求失败
      if (!response.ok) {
        throw new Error("Network response was not successful.");
      }
  
      const data = await response.json();
  
      // API status should be OK / API 状态必须是 OK
      if (data.status !== "OK") {
        throw new Error("The API returned an error. Please try another location.");
      }
  
      return data;
    }
  
    // Update dashboard with API data / 使用 API 数据更新页面
    function updateDashboard(todayData, tomorrowData, locationName) {
      const todayResults = todayData.results;
      const tomorrowResults = tomorrowData.results;
  
      locationTitle.textContent = locationName;
      timezoneText.textContent = `Time Zone: ${todayResults.timezone}`;
  
      todayDate.textContent = `Date: ${todayResults.date}`;
      todaySunrise.textContent = todayResults.sunrise;
      todaySunset.textContent = todayResults.sunset;
      todayDawn.textContent = todayResults.dawn;
      todayDusk.textContent = todayResults.dusk;
      todayDayLength.textContent = todayResults.day_length;
      todaySolarNoon.textContent = todayResults.solar_noon;
  
      tomorrowDate.textContent = `Date: ${tomorrowResults.date}`;
      tomorrowSunrise.textContent = tomorrowResults.sunrise;
      tomorrowSunset.textContent = tomorrowResults.sunset;
      tomorrowDawn.textContent = tomorrowResults.dawn;
      tomorrowDusk.textContent = tomorrowResults.dusk;
      tomorrowDayLength.textContent = tomorrowResults.day_length;
      tomorrowSolarNoon.textContent = tomorrowResults.solar_noon;
    }
  
    // Main search function / 主查询函数
    async function getSunData(latitude, longitude, locationName) {
      try {
        showMessage("Loading sunrise and sunset data...", "success");
  
        // Request today and tomorrow at the same time.
        // 同时请求今天和明天的数据。
        const [todayData, tomorrowData] = await Promise.all([
          fetchSunData(latitude, longitude, "today"),
          fetchSunData(latitude, longitude, "tomorrow")
        ]);
  
        updateDashboard(todayData, tomorrowData, locationName);
        showMessage("Data loaded successfully. You can search again anytime.", "success");
      } catch (error) {
        resetDashboard();
        showMessage(`Error: ${error.message}`, "error");
      }
    }
  
    // Handle select list search / 处理下拉框查询
    function handleSearchClick() {
      const selectedValue = locationSelect.value;
  
      // Check whether user selected a location / 检查用户是否选择了地点
      if (!selectedValue) {
        resetDashboard();
        showMessage("Please select a location first.", "error");
        return;
      }
  
      // The option value format is: latitude,longitude,location name
      // option 的 value 格式是：纬度,经度,地点名称
      const [latitude, longitude, locationName] = selectedValue.split(",");
  
      getSunData(latitude, longitude, locationName);
    }
  
    // Handle current location button / 处理当前定位按钮
    function handleCurrentLocationClick() {
      // Check if browser supports Geolocation API.
      // 检查浏览器是否支持 Geolocation API。
      if (!navigator.geolocation) {
        resetDashboard();
        showMessage("Geolocation is not supported by your browser.", "error");
        return;
      }
  
      showMessage("Getting your current location...", "success");
  
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          getSunData(latitude, longitude, "Your Current Location");
        },
        function () {
          resetDashboard();
          showMessage(
            "Unable to get your location. Please allow location access or select a city.",
            "error"
          );
        }
      );
    }
  
    // Add event listeners / 绑定按钮点击事件
    searchBtn.addEventListener("click", handleSearchClick);
    currentLocationBtn.addEventListener("click", handleCurrentLocationClick);
  })();