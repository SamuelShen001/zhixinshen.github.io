// Zhixin Shen
// ITMD 541-01 Graduate Student

// International Tip Calculator
// 国际小费计算器

(function () {
    "use strict";
  
    // Form element / 表单元素
    const form = document.querySelector("#tipForm");
  
    // User input fields / 用户输入字段
    const billTotalInput = document.querySelector("#billTotal");
    const taxExemptInput = document.querySelector("#taxExempt");
    const currencySelect = document.querySelector("#currency");
    const tipRangeInput = document.querySelector("#tipRange");
  
    // Output fields / 输出字段
    const tipPercentageInput = document.querySelector("#tipPercentage");
    const billWithTaxInput = document.querySelector("#billWithTax");
    const tipAmountInput = document.querySelector("#tipAmount");
    const finalTotalInput = document.querySelector("#finalTotal");
    const errorMessage = document.querySelector("#errorMessage");
  
    // Fixed conversion rates from the lab instructions
    // 作业要求给定的固定汇率
    const conversionRates = {
      USD: 1,
      EUR: 0.95,
      INR: 85
    };
  
    // Clear output fields / 清空输出框
    function clearOutputs() {
      billWithTaxInput.value = "";
      tipAmountInput.value = "";
      finalTotalInput.value = "";
    }
  
    // Reset outputs to zero / 把输出框重置为 0.00
    function resetOutputsToZero() {
      billWithTaxInput.value = "0.00";
      tipAmountInput.value = "0.00";
      finalTotalInput.value = "0.00";
    }
  
    // Format number to 2 decimal places / 保留两位小数
    function formatMoney(value) {
      return value.toFixed(2);
    }
  
    // Main calculator function / 主计算函数
    function updateCalculator() {
      // Read current values / 读取当前输入值
      const rawBillValue = billTotalInput.value.trim();
      const tipPercent = Number(tipRangeInput.value);
      const selectedCurrency = currencySelect.value;
      const isTaxExempt = taxExemptInput.checked;
  
      // Always update tip percentage display / 始终更新小费百分比显示
      tipPercentageInput.value = `${tipPercent}%`;
  
      // Clear old error message / 清除旧的错误提示
      errorMessage.textContent = "";
  
      // If bill input is empty, clear outputs / 如果账单输入为空，清空输出
      if (rawBillValue === "") {
        clearOutputs();
        return;
      }
  
      // Convert input to number / 将输入值转成数字
      const billTotal = Number(rawBillValue);
  
      // Validation: invalid number / 校验：不是有效数字
      if (Number.isNaN(billTotal)) {
        clearOutputs();
        errorMessage.textContent = "Please enter a valid number.";
        return;
      }
  
      // Validation: negative number not allowed / 校验：不允许负数
      if (billTotal < 0) {
        clearOutputs();
        errorMessage.textContent = "Bill total cannot be negative.";
        return;
      }
  
      // If bill is 0, reset all outputs / 如果账单为 0，则重置输出
      if (billTotal === 0) {
        resetOutputsToZero();
        return;
      }
  
      // Tax calculation / 税额计算
      // Tax is 11% unless tax exempt is checked
      // 税率固定 11%，如果勾选免税则税额为 0
      const taxAmount = isTaxExempt ? 0 : billTotal * 0.11;
      const totalBillWithTax = billTotal + taxAmount;
  
      // Tip calculation / 小费计算
      // Tip is based on the original bill total
      // 小费按原始账单金额计算
      const tipAmountUSD = billTotal * (tipPercent / 100);
  
      // Final total in USD / 美元下的最终总额
      const finalTotalUSD = totalBillWithTax + tipAmountUSD;
  
      // Currency conversion / 货币转换
      const rate = conversionRates[selectedCurrency];
      const convertedTipAmount = tipAmountUSD * rate;
      const convertedFinalTotal = finalTotalUSD * rate;
  
      // Update outputs / 更新输出框
      // Total Bill with Tax stays in the selected working display format of the form.
      // 这里按当前作业页面逻辑，含税总额直接显示数值结果。
      billWithTaxInput.value = formatMoney(totalBillWithTax);
      tipAmountInput.value = formatMoney(convertedTipAmount);
      finalTotalInput.value = formatMoney(convertedFinalTotal);
    }
  
    // Listen for input events on the entire form
    // 监听整个表单的 input 事件，任意字段变化都实时更新
    form.addEventListener("input", updateCalculator);
  
    // Initialize default output on first load / 页面加载时初始化
    updateCalculator();
  })();