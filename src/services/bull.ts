import Queue from "bull";
import { $env } from "./env";
import { $logger } from "./logger";

function BullService() {
    const QUEUES: Queue.Queue[] = [];

    return {
        get QUEUES() {
            return QUEUES;
        },

        Queue(name: string) {
            let queue = new Queue(name, $env.REDIS_URL, {
                defaultJobOptions: {
                    removeOnComplete: true,
                    attempts: 3,
                    backoff: {
                        delay: 100 + Math.random() * 150,
                        type: "exponential",
                    },
                },
                redis: {
                    tls: $env.REDIS_TLS_ENABLED
                        ? {
                              rejectUnauthorized: false,
                              requestCert: true,
                          }
                        : undefined,
                },
            });

            QUEUES.push(queue);

            queue.on("failed", (job) => {
                $logger.error(job, "job failed");
            });

            $logger.info(
                {
                    tls_enabled: $env.REDIS_TLS_ENABLED,
                    queue_name: name,
                },
                `redis queue created`,
            );

            return queue;
        },
    };
}

export const $bull = BullService();
