/// <reference path="../typings/tsd.d.ts" />
declare module AngularSmarterModels {
    var smModule: ng.IModule;
}

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="module.d.ts" />
declare module AngularSmarterModels {
    interface ModelWrapper {
        props: any;
        config: any;
    }
}

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="module.d.ts" />
/// <reference path="model-wrapper.d.ts" />
declare module AngularSmarterModels {
    class ModelInstance implements ModelWrapper {
        config: any;
        constructor(config: any);
        props: any;
        serialize(): string;
        merge(src: any): void;
        setModelPath(path: any): void;
        getModelPath(): string;
        save(): ng.IPromise<void>;
        delete(): ng.IPromise<void>;
    }
}

/// <reference path="module.d.ts" />
/// <reference path="model-instance.d.ts" />
/// <reference path="model-wrapper.d.ts" />
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
        create(params: any, props: any): ng.IPromise<ModelInstance>;
    }
}

/// <reference path="../typings/tsd.d.ts" />
/// <reference path="module.d.ts" />
/// <reference path="model-wrapper.d.ts" />
declare module AngularSmarterModels {
    class ModelListItemInstance implements ModelWrapper {
        private _config;
        constructor(_config: any);
        config: any;
        props: any;
    }
}

/// <reference path="module.d.ts" />
/// <reference path="model-instance.d.ts" />
/// <reference path="model.d.ts" />
/// <reference path="model-list-item-instance.d.ts" />
declare module AngularSmarterModels {
    class ModelDataRetrieverError extends Error {
        constructor(message: any);
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
        private cacheList(modelUrl, modelData);
        private addModelToList(modelUrl, model, position?);
        private removeModelFromList(modelUrl, modelId, identifyingField);
        get(modelPath: string, listPath: string, params: any, ModelInstance: any, identifyingField: string): ModelInstance;
        getAsync(modelPath: string, listPath: string, params: any, ModelInstance: any, identifyingField: string): ng.IPromise<ModelInstance>;
        getMultiple(modelPath: string, listPath: string, params: any, ModelInstance: any, identifyingField: string): ng.IPromise<Array<ModelInstance>>;
        list(listPath: string, modelPath: string, params: any, identifyingField: string): ModelWrapper[];
        listAsync(listPath: string, modelPath: string, params: any, identifyingField: string): ng.IPromise<ModelWrapper[]>;
        save(model: ModelInstance): ng.IHttpPromise<void>;
        create(modelPath: string, listPath: string, params: any, model: ModelInstance): ng.IPromise<ModelInstance>;
        delete(modelPath: string, listPath: string, identifyingField: string): ng.IPromise<void>;
    }
}

/// <reference path="module.d.ts" />
/// <reference path="model-instance.d.ts" />
/// <reference path="model.d.ts" />
/// <reference path="model-data-retriever.d.ts" />
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
