import React, { ReactNode } from "react"

export class LandingPage {
  public static render = async (): Promise<ReactNode> => (
    <>
      <h1>RapDv Starter App</h1>
      <div className="mt-3">
        <a href="https://rapdv.com" target="_blank">More information about RapDv - Rapid Development Framework</a>
      </div>
      <div className="mt-3">
        Enjoy building your app!
      </div>
    </>
  )
}
