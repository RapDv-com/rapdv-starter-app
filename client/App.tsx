import { AppClient } from "../submodules/rapdv/client/app/AppClient"
import { ClientPage } from "../submodules/rapdv/client/elements/PagesCtrl"
import "./styles/style.scss"

const pages: Array<ClientPage> = []
// Add a client page specific logic here, as: pages.push(new SomePage())

const app = new AppClient()
app.start(pages)
