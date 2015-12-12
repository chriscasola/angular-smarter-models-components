/// <reference path="../typings/tsd.d.ts"/>
var AngularSmarterModels;
(function (AngularSmarterModels) {
    AngularSmarterModels.smModule = angular.module('sm.models', []);
})(AngularSmarterModels || (AngularSmarterModels = {}));

/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="./module.ts"/>

/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="./module.ts"/>
/// <reference path="./model-wrapper.ts"/>
var AngularSmarterModels;
(function (AngularSmarterModels) {
    var ModelInstance = (function () {
        function ModelInstance(config) {
            this.config = config;
            if (!angular.isObject(this.config.rawModel)) {
                this.config.rawModel = {};
            }
        }
        Object.defineProperty(ModelInstance.prototype, "props", {
            get: function () {
                return this.config.rawModel;
            },
            enumerable: true,
            configurable: true
        });
        ModelInstance.prototype.serialize = function () {
            return JSON.stringify(this.config.rawModel);
        };
        ModelInstance.prototype.merge = function (src) {
            angular.extend(this.config.rawModel, src);
        };
        ModelInstance.prototype.setModelPath = function (path) {
            this.config.modelPath = path;
        };
        ModelInstance.prototype.getModelPath = function () {
            return this.config.modelPath;
        };
        ModelInstance.prototype.save = function () {
            return this.config.modelDataRetriever.save(this);
        };
        ModelInstance.prototype.delete = function () {
            return this.config.modelDataRetriever.delete(this.config.modelPath, this.config.listPath, this.config.idField);
        };
        return ModelInstance;
    })();
    AngularSmarterModels.ModelInstance = ModelInstance;
    AngularSmarterModels.smModule.value('SMModelInstance', ModelInstance);
})(AngularSmarterModels || (AngularSmarterModels = {}));

/// <reference path="./module.ts"/>
/// <reference path="./model-instance.ts"/>
/// <reference path="./model-wrapper.ts"/>
var AngularSmarterModels;
(function (AngularSmarterModels) {
    var Model = (function () {
        function Model(config) {
            this.config = config;
        }
        Model.prototype.get = function (params) {
            return this.config.modelDataRetriever.get(this.config.modelPath, this.config.listPath, params, this.config.ModelInstance, this.config.idField);
        };
        Model.prototype.getAsync = function (params) {
            return this.config.modelDataRetriever.getAsync(this.config.modelPath, this.config.listPath, params, this.config.ModelInstance, this.config.idField);
        };
        Model.prototype.list = function (params) {
            return this.config.modelDataRetriever.list(this.config.listPath, this.config.modelPath, params, this.config.idField);
        };
        Model.prototype.listAsync = function (params) {
            return this.config.modelDataRetriever.listAsync(this.config.listPath, this.config.modelPath, params, this.config.idField);
        };
        Model.prototype.create = function (params, props) {
            var createPath = this.config.modelPath.split('/').slice(0, -1).join('/') + '/';
            return this.config.modelDataRetriever.create(createPath, this.config.listPath, params, new this.config.ModelInstance({
                rawModel: props,
                modelDataRetriever: this.config.modelDataRetriever,
                modelPath: this.config.modelPath,
                idField: this.config.idField,
            }));
        };
        return Model;
    })();
    AngularSmarterModels.Model = Model;
    AngularSmarterModels.smModule.value('SMModel', Model);
})(AngularSmarterModels || (AngularSmarterModels = {}));

/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="./module.ts"/>
/// <reference path="./model-wrapper.ts"/>
var AngularSmarterModels;
(function (AngularSmarterModels) {
    var ModelListItemInstance = (function () {
        function ModelListItemInstance(_config) {
            this._config = _config;
        }
        Object.defineProperty(ModelListItemInstance.prototype, "config", {
            get: function () {
                return this._config.config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelListItemInstance.prototype, "props", {
            get: function () {
                return this._config.rawModel;
            },
            enumerable: true,
            configurable: true
        });
        return ModelListItemInstance;
    })();
    AngularSmarterModels.ModelListItemInstance = ModelListItemInstance;
    AngularSmarterModels.smModule.value('SMModelListItemInstance', ModelListItemInstance);
})(AngularSmarterModels || (AngularSmarterModels = {}));

/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="./module.ts"/>
/// <reference path="./model-wrapper.ts"/>
var AngularSmarterModels;
(function (AngularSmarterModels) {
    var ModelError = (function () {
        function ModelError(config) {
            this.config = config;
        }
        Object.defineProperty(ModelError.prototype, "props", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelError.prototype, "error", {
            get: function () {
                return this.config.error;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelError.prototype, "time", {
            get: function () {
                return this.config.time;
            },
            enumerable: true,
            configurable: true
        });
        return ModelError;
    })();
    AngularSmarterModels.ModelError = ModelError;
})(AngularSmarterModels || (AngularSmarterModels = {}));

/// <reference path="./module.ts"/>
/// <reference path="./model-instance.ts"/>
/// <reference path="./model.ts"/>
/// <reference path="./model-list-item-instance.ts"/>
/// <reference path="./model-error.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AngularSmarterModels;
(function (AngularSmarterModels) {
    var ModelDataRetrieverError = (function (_super) {
        __extends(ModelDataRetrieverError, _super);
        function ModelDataRetrieverError(message) {
            _super.call(this, message);
            this.name = 'ModelDataRetrieverError';
        }
        return ModelDataRetrieverError;
    })(Error);
    AngularSmarterModels.ModelDataRetrieverError = ModelDataRetrieverError;
    var retryInterval = 10000;
    function buildUrl(path, params) {
        return path.split('/').map(function (pathComponent) {
            if (pathComponent[0] === ':') {
                var subValue = params[pathComponent.slice(1)];
                if (subValue !== null && subValue !== undefined) {
                    return subValue;
                }
                throw new ModelDataRetrieverError("Missing required param \"" + pathComponent.slice(1) + "\" for path \"" + path + "\"!");
            }
            return pathComponent;
        }).join('/');
    }
    var ModelDataRetriever = (function () {
        function ModelDataRetriever($q, $http) {
            this.$q = $q;
            this.$http = $http;
            this.modelCache = {};
            this.outstandingRequests = {};
            this.listCache = {};
        }
        ModelDataRetriever.prototype.cacheModel = function (modelUrl, listUrl, ModelInstance, modelData, identifyingField) {
            var self = this;
            var modelInstance = new ModelInstance({
                rawModel: modelData,
                modelDataRetriever: self,
                modelPath: modelUrl,
                listPath: listUrl,
                idField: identifyingField,
            });
            this.modelCache[modelUrl] = modelInstance;
            this.addModelToList(listUrl, modelInstance, 0);
            return modelInstance;
        };
        ModelDataRetriever.prototype.cacheError = function (modelUrl, listUrl, identifyingField) {
            var errorInstance = new AngularSmarterModels.ModelError({
                error: 'An error occurred fetching the model!',
                time: Date.now(),
            });
            this.modelCache[modelUrl] = errorInstance;
            return errorInstance;
        };
        ModelDataRetriever.prototype.cacheList = function (modelUrl, modelData) {
            this.listCache[modelUrl] = modelData;
            return modelData;
        };
        ModelDataRetriever.prototype.hasListCache = function (modelUrl) {
            var cacheItem = this.listCache[modelUrl];
            return this.listCache.hasOwnProperty(modelUrl) && cacheItem !== null;
        };
        ModelDataRetriever.prototype.shouldRetryFetch = function (modelError) {
            return Date.now() - modelError.time > retryInterval;
        };
        ModelDataRetriever.prototype.addModelToList = function (modelUrl, model, position) {
            if (position === void 0) { position = 0; }
            if (this.hasListCache(modelUrl)) {
                var modelList = this.listCache[modelUrl];
                for (var i = 0; i < modelList.length; i++) {
                    if (modelList[i].props[model.config.idField] === model.props[model.config.idField]) {
                        modelList[i] = model;
                        return;
                    }
                }
                this.listCache[modelUrl].splice(position, 0, model);
            }
        };
        ModelDataRetriever.prototype.removeModelFromList = function (modelUrl, modelId, identifyingField) {
            var modelList = this.listCache[modelUrl];
            for (var i = 0; i < modelList.length; i++) {
                if (modelList[i].props[identifyingField] === modelId) {
                    modelList.splice(i, 1);
                    break;
                }
            }
        };
        ModelDataRetriever.prototype.get = function (modelPath, listPath, params, ModelInstance, identifyingField) {
            var modelUrl = buildUrl(modelPath, params);
            var cachedValue = this.modelCache[modelUrl];
            var valueInCache = this.modelCache.hasOwnProperty(modelUrl);
            if (!valueInCache || (cachedValue instanceof AngularSmarterModels.ModelError && this.shouldRetryFetch(cachedValue))) {
                this.getAsync(modelPath, listPath, params, ModelInstance, identifyingField);
            }
            if (valueInCache) {
                return cachedValue;
            }
        };
        ModelDataRetriever.prototype.getAsync = function (modelPath, listPath, params, ModelInstance, identifyingField) {
            var _this = this;
            var modelUrl = buildUrl(modelPath, params);
            var modelPromise;
            var cachedValue = this.modelCache[modelUrl];
            if (this.modelCache.hasOwnProperty(modelUrl) && !(cachedValue instanceof AngularSmarterModels.ModelError)) {
                modelPromise = this.$q.when(cachedValue);
            }
            else if (this.outstandingRequests.hasOwnProperty(modelUrl)) {
                modelPromise = this.outstandingRequests[modelUrl];
            }
            else {
                modelPromise = this.$http.get(modelUrl)
                    .then(function (response) {
                    return _this.cacheModel(modelUrl, listPath, ModelInstance, response.data, identifyingField);
                })
                    .catch(function (response) {
                    return _this.$q.reject(_this.cacheError(modelUrl, listPath, identifyingField));
                })
                    .finally(function () {
                    delete _this.outstandingRequests[modelUrl];
                });
                this.outstandingRequests[modelUrl] = modelPromise;
            }
            return modelPromise;
        };
        ModelDataRetriever.prototype.getMultiple = function (modelPath, listPath, params, ModelInstance, identifyingField) {
            var _this = this;
            var modelUrl = buildUrl(modelPath, params);
            var modelPromise;
            if (this.outstandingRequests.hasOwnProperty(modelUrl)) {
                modelPromise = this.outstandingRequests[modelUrl];
            }
            else {
                modelPromise = this.$http.get(modelUrl).then(function (response) {
                    if (!angular.isArray(response.data)) {
                        return _this.$q.reject(new ModelDataRetrieverError("Expected array of models for getMultiple request for path \"" + modelUrl + "\"!"));
                    }
                    return response.data.map(function (modelData) {
                        return _this.cacheModel(modelUrl + '/' + modelData[identifyingField], listPath, ModelInstance, modelData, identifyingField);
                    });
                })
                    .finally(function () {
                    delete _this.outstandingRequests[modelUrl];
                });
                this.outstandingRequests[modelUrl] = modelPromise;
            }
            return modelPromise;
        };
        ModelDataRetriever.prototype.list = function (listPath, modelPath, params, identifyingField) {
            var modelUrl = buildUrl(listPath, params);
            if (this.hasListCache(modelUrl)) {
                return this.listCache[modelUrl];
            }
            if (this.listCache[modelUrl] !== null) {
                this.listAsync(listPath, modelPath, params, identifyingField);
            }
        };
        ModelDataRetriever.prototype.listAsync = function (listPath, modelPath, params, identifyingField) {
            var _this = this;
            var modelUrl = buildUrl(listPath, params);
            var modelPromise;
            if (this.hasListCache(modelUrl)) {
                modelPromise = this.$q.when(this.listCache[modelUrl]);
            }
            else if (this.outstandingRequests.hasOwnProperty(modelUrl)) {
                modelPromise = this.outstandingRequests[modelUrl];
            }
            else {
                modelPromise = this.$http.get(modelUrl).then(function (response) {
                    if (!angular.isArray(response.data)) {
                        return _this.$q.reject(new ModelDataRetrieverError("Expected array of models for list request for path \"" + modelUrl + "\"!"));
                    }
                    var modelList = response.data.map(function (listItem) {
                        var actualModelParams = (_a = {},
                            _a[identifyingField] = listItem[identifyingField],
                            _a
                        );
                        angular.extend(actualModelParams, params);
                        var actualModelUrl = buildUrl(modelPath, actualModelParams);
                        if (_this.modelCache.hasOwnProperty(actualModelUrl)) {
                            return _this.modelCache[actualModelUrl];
                        }
                        else {
                            return new AngularSmarterModels.ModelListItemInstance({
                                rawModel: listItem,
                                config: {
                                    idField: identifyingField,
                                },
                            });
                        }
                        var _a;
                    });
                    return _this.cacheList(modelUrl, modelList);
                })
                    .catch(function (response) {
                    _this.listCache[modelUrl] = null;
                    return _this.$q.reject(response);
                })
                    .finally(function () {
                    delete _this.outstandingRequests[modelUrl];
                });
                this.outstandingRequests[modelUrl] = modelPromise;
            }
            return modelPromise;
        };
        ModelDataRetriever.prototype.save = function (model) {
            return this.$http.post(model.getModelPath(), model.serialize()).then(function (response) {
                // do nothing, do this to return a standard angular promise instead of an $http one
            });
        };
        ModelDataRetriever.prototype.create = function (modelPath, listPath, params, model) {
            var _this = this;
            var modelUrl = buildUrl(modelPath, params);
            return this.$http.put(modelUrl, model.serialize()).then(function (response) {
                model.merge(response.data);
                _this.modelCache[response.headers('Location')] = model;
                _this.addModelToList(listPath, model);
                return model;
            });
        };
        ModelDataRetriever.prototype.delete = function (modelPath, listPath, identifyingField) {
            var _this = this;
            var modelId;
            if (this.modelCache.hasOwnProperty(modelPath)) {
                modelId = this.modelCache[modelPath].props[identifyingField];
            }
            delete this.modelCache[modelPath];
            return this.$http.delete(modelPath).then(function (response) {
                if (modelId != null) {
                    _this.removeModelFromList(listPath, modelId, identifyingField);
                }
            });
        };
        ModelDataRetriever.$inject = ['$q', '$http'];
        return ModelDataRetriever;
    })();
    AngularSmarterModels.ModelDataRetriever = ModelDataRetriever;
    var serviceProvider = {
        setRetryInterval: function (interval) {
            retryInterval = interval;
        },
        $get: ['$injector', function ($injector) {
                return $injector.instantiate(ModelDataRetriever);
            }]
    };
    AngularSmarterModels.smModule
        .value('smModelDataRetrieverError', ModelDataRetrieverError)
        .provider('smModelDataRetriever', serviceProvider);
})(AngularSmarterModels || (AngularSmarterModels = {}));

/// <reference path="./module.ts"/>
/// <reference path="./model-instance.ts"/>
/// <reference path="./model.ts"/>
/// <reference path="./model-data-retriever.ts"/>
var AngularSmarterModels;
(function (AngularSmarterModels) {
    var ModelBuilder = (function () {
        function ModelBuilder(route, _listPath, Model, ModelInstance, _modelDataRetriever, _idField) {
            this.route = route;
            this._listPath = _listPath;
            this.Model = Model;
            this.ModelInstance = ModelInstance;
            this._modelDataRetriever = _modelDataRetriever;
            this._idField = _idField;
        }
        ModelBuilder.prototype.model = function (Model) {
            this.Model = Model;
            return this;
        };
        ModelBuilder.prototype.modelInstance = function (ModelInstance) {
            this.ModelInstance = ModelInstance;
            return this;
        };
        ModelBuilder.prototype.modelDataRetriever = function (modelDataRetriever) {
            this._modelDataRetriever = modelDataRetriever;
            return this;
        };
        ModelBuilder.prototype.listPath = function (listPath) {
            this._listPath = listPath;
            return this;
        };
        ModelBuilder.prototype.idField = function (fieldName) {
            this._idField = fieldName;
            return this;
        };
        ModelBuilder.prototype.done = function () {
            return new this.Model({
                modelPath: this.route,
                ModelInstance: this.ModelInstance,
                modelDataRetriever: this._modelDataRetriever,
                listPath: this._listPath,
                idField: this._idField,
            });
        };
        return ModelBuilder;
    })();
    AngularSmarterModels.ModelBuilder = ModelBuilder;
    function modelFactory(SMModel, SMModelInstance, smModelDataRetriever) {
        var service = function (route, listPath) {
            return new ModelBuilder(route, listPath, SMModel, SMModelInstance, smModelDataRetriever, 'id');
        };
        return service;
    }
    modelFactory.$inject = ['SMModel', 'SMModelInstance', 'smModelDataRetriever'];
    angular.module('sm.models').factory('smModelFactory', modelFactory);
})(AngularSmarterModels || (AngularSmarterModels = {}));

//# sourceMappingURL=angular-smarter-models.js.map