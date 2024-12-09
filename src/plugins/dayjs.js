import dayjs from "dayjs"
import minMax from "dayjs/plugin/minMax"

dayjs.extend(minMax)

export default {
  install(app) {
    app.config.globalProperties.$dayjs = dayjs
  },
}
