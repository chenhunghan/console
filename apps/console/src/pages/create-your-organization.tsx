import * as React from "react";
import { Logo } from "@instill-ai/design-system";
import {
  CreateYourOrganizationView,
  PageBase,
  PageTitle,
  Topbar,
} from "@instill-ai/toolkit";

import { NextPageWithLayout } from "./_app";
import { Sidebar, ConsoleCorePageHead } from "../components";

const OnBoardingPage: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <ConsoleCorePageHead title="Create your organization" />
      <CreateYourOrganizationView />
    </React.Fragment>
  );
};

OnBoardingPage.getLayout = (page) => {
  return (
    <PageBase>
      <Topbar logo={<Logo variant="colourLogomark" width={38} />} />
      <PageBase.Container>
        <Sidebar />
        <PageBase.Content>{page}</PageBase.Content>
      </PageBase.Container>
    </PageBase>
  );
};

export default OnBoardingPage;
