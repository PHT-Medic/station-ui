/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Client, Config } from '@trapi/client';
import { TrainAPI } from '../../../domains/train';
import { TrainConfigAPI } from '../../../domains/train-config';

export class HTTPClient extends Client {
    protected train : TrainAPI;

    protected trainConfig: TrainConfigAPI;

    constructor(config: Config) {
        super(config);

        this.train = new TrainAPI(this.driver);

        this.trainConfig = new TrainConfigAPI(this.driver);
    }
}
