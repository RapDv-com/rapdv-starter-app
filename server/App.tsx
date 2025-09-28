import React, { ReactNode } from "react"
import { LogInPage } from "./pages/LogInPage"
import { ProfilePage } from "./pages/user/ProfilePage"
import { PageTerms } from "./pages/PageTerms"
import { PagePrivacy } from "./pages/PagePrivacy"
import { RapDvApp } from "../submodules/rapdv/server/RapDvApp"
import { ReqType } from "../submodules/rapdv/server/ReqType"
import { Role } from "../submodules/rapdv/server/Role"
import { UserRole } from "../submodules/rapdv/server/database/CollectionUser"
import { Request } from "../submodules/rapdv/server/server/Request"
import { Mailer } from "../submodules/rapdv/server/mailer/Mailer"
import { VerifyEmailPage } from "./pages/VerifyEmailPage"
import { UsersPage } from "./pages/admin/UsersPage"
import { LandingPage } from "./pages/LandingPage"
import { AuthGoogle } from "../submodules/rapdv/server/auth/AuthGoogle"
import { ViewError } from "./pages/base/ViewError"
import { ViewLayout } from "./pages/base/ViewLayout"

export class App extends RapDvApp {
  constructor() {
    super()
  }

  getBasicInfo = () => ({
    name: "RapDv Starter App",
    description: "RapDv Starter App - Create apps quickly",
    themeColor: "#000000"
  })

  public initAuth: () => Promise<void> = async () => {
    AuthGoogle.configure()
  }

  getPages = async () => {
    this.addRoute(
      "/",
      ReqType.Get,
      LandingPage.render,
      "RapDv Starter App",
      "RapDv is a rapid development framework for quickly creating any web application."
    )
    this.addRoute("/terms", ReqType.Get, PageTerms.render, "Terms and Conditions", "Our terms and conditions")
    this.addRoute("/privacy", ReqType.Get, PagePrivacy.render, "Privacy Policy", "Our privacy policy")

    this.addRoute("/log-in", ReqType.Get, LogInPage.render, "Log in", "Log in to our app", [Role.Guest])
    this.addRoute("/log-in", ReqType.Post, LogInPage.login, "Log in", "Log in to our app", [Role.Guest])

    this.addEndpoint("/log-in/google", ReqType.Get, LogInPage.loginWithGoogle, [Role.Guest])
    this.addEndpoint("/log-in/google/callback", ReqType.Get, LogInPage.loginWithGoogleCallback)

    this.addRoute(
      "/verify-email/:email",
      ReqType.Get,
      VerifyEmailPage.render,
      "Verify your email",
      "Verify your email",
      [Role.Guest],
      true
    )
    this.addRoute(
      "/verify-email/:email/:code",
      ReqType.Get,
      VerifyEmailPage.render,
      "Verify your email",
      "Verify your email",
      [Role.Guest],
      true
    )
    this.addRoute(
      "/verify-email/:email",
      ReqType.Post,
      VerifyEmailPage.verifyEmail,
      "Verify your email",
      "Verify your email",
      [Role.Guest],
      true
    )

    this.addGenericRoute("/log-out", ReqType.Get, LogInPage.logout, [Role.LoggedIn])
    this.addGenericRoute("/log-out", ReqType.Post, LogInPage.logout, [Role.LoggedIn])

    this.addRoute("/profile", ReqType.Get, ProfilePage.render, "Profile", "Edit your profile", [Role.LoggedIn])
    this.addRoute("/profile", ReqType.Post, ProfilePage.edit, "Profile", "Edit your profile", [Role.LoggedIn], false, true)

    this.addRoute("/users", ReqType.Get, UsersPage.renderUsersList, "Users List", "Users list", [UserRole.Admin])
    this.addRoute("/user/:email", ReqType.Get, UsersPage.renderUser, "Edit user", "Edit user", [UserRole.Admin])
    this.addRoute("/user/:email", ReqType.Post, UsersPage.updateUser, "Edit user", "Edit user", [UserRole.Admin])
  }

  getHeadTags = async () => ""

  getLayout = async (
    req: Request,
    canonicalUrl: string,
    title: string,
    description: string,
    content: ReactNode | string,
    styleTags: ReactNode,
    disableIndexing: boolean,
    clientFilesId: string,
    otherOptions?: any
  ): Promise<ReactNode> => {
    const appInfo = this.getBasicInfo()
    const appName = appInfo.name
    const photoSrc = await req?.user?.getPhotoSrc()
    const isProduction = RapDvApp.isProduction()
    return (
      <ViewLayout
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        disableIndexing={disableIndexing}
        styles={styleTags}
        isProduction={isProduction}
        appName={appName}
        req={req}
        photoSrc={photoSrc}
        clientFilesId={clientFilesId}
      >
        {content}
      </ViewLayout>
    )
  }

  getErrorView = async (error) => ({
    title: "Error | RapDv Starter App",
    description: "Something went wrong",
    content: <ViewError error={error} />
  })

  getRoles = () => ["Writer"]

  getStorage = async () => {
    this.addCollection(
      "Post",
      {
        key: { type: String, unique: true },
        title: String,
        description: String,
        content: String,
        publishedDate: Date
      },
      {}
    )
  }

  public startRecurringTasks = async (mailer: Mailer): Promise<void> => {
    // Place for starting recurring tasks
  }

  public addDatabaseEvolutions = async () => {
    // Place for adding database evolutions
    await this.addDbEvolution(1, "Initial database version", async (currentVersion: number) => {})
  }
}
