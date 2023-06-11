import { FC, ReactElement } from "react";
import {
  usePipelines,
  PipelinesTable,
  useCreateUpdateDeleteResourceGuard,
  useWatchPipelines,
} from "@instill-ai/toolkit";

import { PageTitle, PageHead, Topbar, Sidebar, PageBase } from "@/components";

type GetLayOutProps = {
  page: ReactElement;
};

const PipelinePage: FC & {
  getLayout?: FC<GetLayOutProps>;
} = () => {
  /* -------------------------------------------------------------------------
   * Query resource data
   * -----------------------------------------------------------------------*/

  const enableGuard = useCreateUpdateDeleteResourceGuard();

  const pipelines = usePipelines({
    enabled: true,
    accessToken: null,
  });

  const pipelinesWatchState = useWatchPipelines({
    enabled: pipelines.isSuccess,
    pipelineNames: pipelines.isSuccess ? pipelines.data.map((p) => p.name) : [],
    accessToken: null,
  });

  const isLoadingResource =
    pipelines.isLoading || (pipelines.isSuccess && pipelines.data.length > 0)
      ? pipelinesWatchState.isLoading
      : false;

  /* -------------------------------------------------------------------------
   * Render
   * -----------------------------------------------------------------------*/

  return (
    <>
      <PageHead title="pipelines" />
      <div className="flex flex-col">
        <PageTitle
          title="Pipeline"
          breadcrumbs={["Pipeline"]}
          enableButton={enableGuard ? false : true}
          buttonName="Add new pipeline"
          buttonLink="/pipelines/create"
          marginBottom="mb-10"
        />
        <PipelinesTable
          pipelines={pipelines.data ? pipelines.data : []}
          pipelinesWatchState={
            pipelinesWatchState.isSuccess ? pipelinesWatchState.data : {}
          }
          isError={pipelines.isError || pipelinesWatchState.isError}
          marginBottom="mb-5"
          isLoading={isLoadingResource}
        />
      </div>
    </>
  );
};

PipelinePage.getLayout = (page) => {
  return (
    <PageBase>
      <Topbar />
      <PageBase.Container>
        <Sidebar />
        <PageBase.Content>{page}</PageBase.Content>
      </PageBase.Container>
    </PageBase>
  );
};

export default PipelinePage;
