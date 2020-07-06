import {
  toast
} from 'react-toastify';

export const copyToClipboard = textToCopy => {
  const text = document.createElement('textarea');
  document.body.appendChild(text);
  text.value = textToCopy;
  text.select();
  document.execCommand('copy');
  document.body.removeChild(text);
  toast('Copied to clipboard', {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 3000,
    className: 'clipboard-toast',
    progressClassName: 'clipboard-toast__progress',
  });
};