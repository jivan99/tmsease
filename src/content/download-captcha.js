const regex = /\d+/g;
const match = location.host.match(regex);
const broker = match[0];
const filename = `captcha${broker}.png`;

const captchaReloadBtn = document.querySelector(
  'a[aria-label="Reload captcha"]'
);
const imageSelector = "img.form-control.captcha-image-dimension";

const getNewImageUrl = (oldImageUrl) => {
  captchaReloadBtn.click();
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const imageEl = document.querySelector(imageSelector);
      if (imageEl.src !== oldImageUrl) {
        clearInterval(interval);
        resolve(imageEl.src);
      }
    }, 100);
  });
};

export const downloadCaptcha = async () => {
  let imageUrl = document.querySelector(imageSelector)?.src;
  imageUrl = await getNewImageUrl(imageUrl);
  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = filename;
  link.click();
};
