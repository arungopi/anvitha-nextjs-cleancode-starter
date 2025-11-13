/**
 * @file apiList.ts
 * @description  List of APIs
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-05-30
 * @module API List
 * @remarks
 * @see 
 * @see 
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const apiList = {
    dataset : {
        list : `/api/dataset_manager/dataset`,
        create : `/api/dataset_manager/dataset`,
        getById : (id:any) => `/api/dataset_manager/dataset/${id}`,
        update : (id:any) => `/api/dataset_manager/dataset/${id}`,
        delete : (id:any) => `/api/dataset_manager/dataset/${id}`
    },
    entries : {
        listByDatasetId : (id:any) => `/api/dataset_manager/dataset/${id}/entries`,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createByDatasetId : (id:any) => `/api/dataset_manager/dataset/entries`,
        getByDatasetId : (id:any) => `/api/dataset_manager/dataset/${id}/entries`,
        update : (id:any) => `/api/dataset_manager/dataset/entries/${id}`,
        delete : (id:any) => `/api/dataset_manager/dataset/entries/${id}`
    },
    taggedDataset : {
        list : `/api/text_tagger/dataset`,
        create : `/api/text_tagger/dataset`,
        getById : (id:any) => `/api/text_tagger/dataset/${id}`,
        update : (id:any) => `/api/text_tagger/dataset/${id}`,
        delete : (id:any) => `/api/text_tagger/dataset/${id}`
    },
    tagsetEntries : {
        listByDatasetId : (id:any) => `/api/text_tagger/dataset/${id}/entries`,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        createByDatasetId : (id:any) => `/api/text_tagger/dataset/entries`,
        getByDatasetId : (id:any) => `/api/text_tagger/dataset/${id}/entries`,
        getEntriesByIdAsCsv : (id:any) => `/api/text_tagger/dataset/${id}/entries/csv`,
        update : (id:any) => `/api/text_tagger/dataset/entries/${id}`,
        delete : (id:any) => `/api/text_tagger/dataset/entries/${id}`
    },
};

export default apiList;