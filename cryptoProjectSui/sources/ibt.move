module 0x2::ibt {
    //
    // 0x2::sui::tx_context, 0x2::sui::object older versions
    //

    use 0x2::sui::tx_context::TxContext;
    use 0x2::sui::object::{UID, new};

    public struct IBTCoin has key, store {
        id: UID
    }

    public entry fun init_ibt(ctx: &mut TxContext) {
        let new_coin = IBTCoin {
            id: new(ctx)
        };
    }

    public entry fun mint(_recipient: address, _amount: u64, _ctx: &mut TxContext) {
        // to be done
    }

    public entry fun burn(_owner: &Signer, _amount: u64, _ctx: &mut TxContext) {
        //to be done
    }
}
