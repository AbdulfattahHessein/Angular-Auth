export const reloadAfterNavigation = (isSuccess: boolean) => {
  if (isSuccess) {
    window.location.reload();
  }
};
