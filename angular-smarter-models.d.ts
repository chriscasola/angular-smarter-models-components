declare module AngularSmarterModels {
    var smModule: ng.IModule;
}
declare module AngularSmarterModels {
    interface ModelWrapper {
        props: any;
        config: any;
    }
}
declare module AngularSmarterModels {
    interface ModelInstanceConfig {
        rawModel: any;
        modelPath: string;
        modelDataRetriever: ModelDataRetriever;
        listPath: string;
        idField: string;
    }
    class ModelInstance implements ModelWrapper {
        config: ModelInstanceConfig;
        constructor(config: ModelInstanceConfig);
        props: any;
        serialize(): string;
        merge(src: any): void;
        setModelPath(path: any): void;
        getModelPath(): string;
        save(): ng.IPromise<void>;
        delete(): ng.IPromise<void>;
    }
}
declare module AngularSmarterModels {
    interface ModelConfig {
        modelDataRetriever: ModelDataRetriever;
        modelPath: string;
        listPath: string;
        ModelInstance: any;
        idField: string;
    }
    class Model {
        private config;
        constructor(config: ModelConfig);
        get(params: any): ModelInstance;
        getAsync(params: any): ng.IPromise<ModelInstance>;
        list(params: any): ModelWrapper[];
        listAsync(params: any): ng.IPromise<ModelWrapper[]>;
        getMultipleAsync(params: any): ng.IPromise<ModelInstance[]>;
        create(params: any, props: any): ng.IPromise<ModelInstance>;
    }
}
declare module AngularSmarterModels {
    class ModelListItemInstance implements ModelWrapper {
        private _config;
        constructor(_config: any);
        config: any;
        props: any;
    }
}
declare module AngularSmarterModels {
    interface ModelErrorConfig {
        error: string;
        time: number;
    }
    class ModelError implements ModelWrapper {
        config: ModelErrorConfig;
        constructor(config: ModelErrorConfig);
        props: any;
        error: string;
        time: number;
    }
}
declare module AngularSmarterModels {
    class ModelDataRetrieverError extends Error {
        message: string;
        constructor(message: string);
    }
    class ModelDataRetriever {
        private $q;
        private $http;
        static $inject: string[];
        private modelCache;
        private outstandingRequests;
        private listCache;
        constructor($q: ng.IQService, $http: ng.IHttpService);
        private cacheModel(modelUrl, listUrl, ModelInstance, modelData, identifyingField);
        private cacheError(modelUrl, listUrl, identifyingField);
        private cacheList(modelUrl, modelData);
        private hasListCache(modelUrl);
        private shouldRetryFetch(modelError);
        private addModelToList(modelUrl, model, position?);
        private removeModelFromList(modelUrl, modelId, identifyingField);
        get(modelPath: string, listPath: string, params: any, ModelInstance: any, identifyingField: string): ModelInstance;
        getAsync(modelPath: string, listPath: string, params: any, ModelInstance: any, identifyingField: string): ng.IPromise<ModelInstance>;
        getMultipleAsync(modelPath: string, listPath: string, params: any, ModelInstance: any, identifyingField: string): ng.IPromise<ModelInstance[]>;
        list(listPath: string, modelPath: string, params: any, identifyingField: string): ModelWrapper[];
        listAsync(listPath: string, modelPath: string, params: any, identifyingField: string): ng.IPromise<ModelWrapper[]>;
        save(model: ModelInstance): ng.IPromise<void>;
        create(modelPath: string, listPath: string, params: any, model: ModelInstance): ng.IPromise<ModelInstance>;
        delete(modelPath: string, listPath: string, identifyingField: string): ng.IPromise<void>;
        private getMultipleHelper<T>(collectionPath, modelPath, params, ModelInstance, identifyingField, isList);
    }
}
declare module AngularSmarterModels {
    class ModelBuilder {
        private route;
        private _listPath;
        private Model;
        private ModelInstance;
        private _modelDataRetriever;
        private _idField;
        constructor(route: string, _listPath: string, Model: any, ModelInstance: any, _modelDataRetriever: ModelDataRetriever, _idField: string);
        model(Model: any): ModelBuilder;
        modelInstance(ModelInstance: any): ModelBuilder;
        modelDataRetriever(modelDataRetriever: any): ModelBuilder;
        listPath(listPath: any): ModelBuilder;
        idField(fieldName: any): ModelBuilder;
        done(): Model;
    }
    interface modelBuilder {
        (route: string, listPath: string): ModelBuilder;
    }
}
