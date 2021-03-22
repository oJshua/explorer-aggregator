import { TopKFilter } from "@albert-team/rebloom";
import { Program } from "../models/Program";
import { ConfirmedBlockSubscription } from "../subscriptions/ConfirmedBlockSubscription";

const K = 20;
const DECAY = 0.9;

/**
 * Just a proof of concept
 */
export class TopPrograms {
  static readonly filter = new TopKFilter("top-programs", {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT + "", 10),
  });

  static async start() {
    await this.filter.connect();

    try {
      await this.filter.reserve(
        K,
        Math.round(K * Math.log2(K)),
        Math.max(5, Math.round(Math.log(K))),
        DECAY
      );
    } catch (error) {
      console.error(error); // TODO: Handle this, likely already initialized
    }

    ConfirmedBlockSubscription.getObservable().subscribe((block) => {
      const transactions = block.transactions;
      for (let transaction of transactions) {
        try {
          const address = transaction.transaction.programId.toBase58();
          this.filter.add(address, 1);
        } catch (error) {
          // some toBase58()s are failing
        }

        for (let instruction of transaction.transaction.instructions) {
          try {
            const address = instruction.programId.toBase58();
            this.filter.add(address, 1);
          } catch (error) {
            // some toBase58()s are failing
          }
        }
      }
    });

    setInterval(async () => {
      const list = await this.filter.list();
      console.log(`Top ${K} Programs`, list);
    }, 10000);
  }

  static async getPrograms() {
    const list = await this.filter.list();
    return list
      .filter((value) => value !== null)
      .map(
        (programId): Program => {
          return {
            address: programId,
          };
        }
      );
  }
}
