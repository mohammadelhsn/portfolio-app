export type ExploreDocsConfig = {
	assignmentsEnabled: boolean;
	labsEnabled: boolean;
	examplesEnabled: boolean;
};

export type ConfigType = {
	subTitleEnabled: boolean;
	overviewEnabled: boolean;
	topicsEnabled: boolean;
	topicsDataEnabled: string[]; // or any[] if not just strings
	technologiesEnabled: boolean;
	technologiesData: string[]; // or any[] depending on your actual data
	exploreDocsEnabled: boolean;
	exploreDocs: ExploreDocsConfig;
	notesEnabled: boolean;
	contactEnabled: boolean;
};
