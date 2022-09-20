/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Client, Config } from 'hapic';
import { AirflowApi } from '../../../domains/airflow';
import { NotificationAPI } from '../../../domains/notifications/api';
import { TrainAPI } from '../../../domains/train';
import { ConfigurationAPI } from '../../../domains/config';
import { TrainConfigAPI } from '../../../domains/train-config';
import { FhirAPI } from '../../../domains/fhir';
import { DatasetAPI } from '../../../domains/datasets/api';
import { LocalTrainAPI } from '../../../domains/local-trains';

export class HTTPClient extends Client {
    public configuration: ConfigurationAPI;

    public train : TrainAPI;

    public trainConfig : TrainConfigAPI;

    public fhir : FhirAPI;

    public datasets: DatasetAPI;

    public airflow: AirflowApi;

    public localTrain: LocalTrainAPI;

    public notification: NotificationAPI;

    constructor(config: Config) {
        super(config);

        this.configuration = new ConfigurationAPI(this.driver);

        this.train = new TrainAPI(this.driver);

        this.trainConfig = new TrainConfigAPI(this.driver);

        this.fhir = new FhirAPI(this.driver);

        this.datasets = new DatasetAPI(this.driver);

        this.airflow = new AirflowApi(this.driver);

        this.localTrain = new LocalTrainAPI(this.driver);

        this.notification = new NotificationAPI(this.driver);
    }
}
