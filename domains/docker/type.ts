/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export type DockerVolume = {
    host_path: string,
    container_path: string,
    mode: 'ro' | 'rw'
};
