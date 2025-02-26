function initStarNotification() {
  setTimeout(() => {
    ElNotification({
      title: "欢迎",
      type: "success",
      message: '开发版本',
      duration: 3000,
      position: "bottom-right"
    })
  }, 0)
}

export function usePany() {
  return { initStarNotification }
}
