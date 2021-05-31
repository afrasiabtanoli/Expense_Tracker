import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Web3 from "web3";
import { abi, address } from './contract.json';

export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async (action, thunkAPI) => {
        if (window.ethereum) {
            await window.ethereum.enable();
            const web3 = new Web3(window.ethereum);
            console.log('Web Initialized: ', web3);
            const contract = new web3.eth.Contract(abi, address);
            console.log('Contract Initialized: ', contract);
            const accounts = await web3.eth.getAccounts();
            console.log('Accounts Initialized: ', accounts);
            const currentAccount = accounts[0];

            return {
                web3: web3,
                contract: contract,
                account: currentAccount,
            }
        }
        else {
            console.log('meta mask not found')
        }
    }
)

export const getBalance = createAsyncThunk(
    "GetBalance",
    async (action, thunkAPI) => {
        try {
            const { contract, address } = thunkAPI.getState().web3;
            const balance = await contract.methods.balance().call();
            console.log('Get Balance Called');

            return {
                output: balance
            }
        } catch (error) {
            console.error("Balance Error: ", error);
        }
    }
)

export const addIncome = createAsyncThunk(
    "AddIncome",
    async (action, thunkAPI) => {
        try {
            const { contract, address } = thunkAPI.getState().web3;
            await contract.methods.Income(1000).send({ from: address });
            console.log('Add Income Called');

            return {

            }
        } catch (error) {
            console.error("Income Error: ", error);
        }
    }
)

export const addExpense = createAsyncThunk(
    "AddExpense",
    async (action, thunkAPI) => {
        const { contract, address } = thunkAPI.getState().web3;
        await contract.methods.expense(500).send({ from: address });
        console.log('Add Expense Called');

        return {

        }
    }
)

const web3Slice = createSlice({
    name: 'Web3Reducer',
    initialState: {
        web3: null,
        contract: null,
        address: null,
        output: null,
    },
    reducers: {
        disconnectWallet: (state) => {
            state.web3 = null;
            state.contract = null;
            state.address = null;
        }
    },
    extraReducers: {
        [initWeb3.fulfilled]: (state, action) => {
            state.web3 = action.payload.web3;
            state.contract = action.payload.contract;
            state.address = action.payload.address;
        },
        [getBalance.fulfilled]: (state, action) => {
            state.output = action.payload.output;
        }
    }
})

export const web3Reducer = web3Slice.reducer;