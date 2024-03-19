export const reloadEntireApp = (navigateSuccess: boolean) => {
  if (navigateSuccess) {
    window.location.reload();
  }
};
