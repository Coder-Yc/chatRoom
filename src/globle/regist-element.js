import 'element-plus/lib/theme-chalk/index.css'
import {
  ElAside,
  ElButton,
  ElContainer,
  ElForm,
  ElIcon,
  ElInput,
  ElMain,
  ElScrollbar,
  ElFooter,
  ElSkeleton,
  ElDialog,
  ElLoading,
  ElAvatar

} from 'element-plus'
const components = [
    ElButton,
    ElForm,
    ElInput,
    ElIcon,
    ElContainer,
    ElAside,
    ElMain,
    ElScrollbar,
    ElFooter,
    ElSkeleton,
    ElDialog,
    ElLoading,
    ElAvatar
    
]
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


export default function (app) {
  for (const component of components) {
    app.component(component.name, component)
  }
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
