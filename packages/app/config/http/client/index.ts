/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { Client, Config } from '@trapi/client';
import { TrainAPI } from '../../../domains/train';

export class HTTPClient extends Client {
    protected train : TrainAPI;

    constructor(config: Config) {
        super(config);

        this.train = new TrainAPI(this.driver);
    }
}
