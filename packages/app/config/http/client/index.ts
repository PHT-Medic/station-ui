/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Client, Config } from '@trapi/client';
import { TrainAPI } from '../../../domains/train';
import { ConfigurationAPI } from '../../../domains/config';
import { TrainConfigAPI } from '../../../domains/train-config';
import { FhirAPI } from '../../../domains/fhir/api';

export class HTTPClient extends Client {
    public configuration: ConfigurationAPI;

    public train : TrainAPI;

    public trainConfig : TrainConfigAPI;

    public fhir : FhirAPI;

    constructor(config: Config) {
        super(config);

        this.configuration = new ConfigurationAPI(this.driver);

        this.train = new TrainAPI(this.driver);

        this.trainConfig = new TrainConfigAPI(this.driver);

        this.fhir = new FhirAPI(this.driver);
    }
}
