import type { NotifyItem } from "./type"

export const notifyData: NotifyItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "测试通知1",
    datetime: "两年前",
    description: "测试测试"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "测试通知2",
    datetime: "三年前",
    description: "测试测试"
  }
]

export const messageData: NotifyItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "测试消息1",
    description: "测试测试",
    datetime: "1998-06-05"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "测试消息2",
    description: "测试测试",
    datetime: "1995-02-04"
  }
]

export const todoData: NotifyItem[] = [
  {
    title: "测试任务1",
    description: "测试测试",
    extra: "未开始",
    status: "info"
  },
  {
    title: "测试任务2",
    description: "测试测试",
    extra: "进行中",
    status: "primary"
  },
  {
    title: "测试任务3",
    description: "测试测试",
    extra: "已超时",
    status: "danger"
  }
]
