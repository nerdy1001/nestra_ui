import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: '',
    description: '',
    city: '',
    state: '',
    address: '',
    coverPhoto: '',
    otherPhotos: [''],
    IdPhoto: [''],
    IdCardNumber: '',
    amenities: [''],
    pricing: [{}],
    extraFees: [{}],
    category: '',
    houseArrangement: '',
    houseRules: '',
}

const propertySlice = createSlice({
    name: 'property',
    initialState,
    reducers: {
        setTitleAndDescription: ( state, action ) => {
            state.title = action.payload.title
            state.description = action.payload.description
        },
        setLocation: ( state, action ) => {
            state.city = action.payload.city
            state.address = action.payload.address
        },
        setCategory: ( state, action ) => {
            state.category = action.payload
        },
        setCoverPhoto: ( state, action ) => {
            state.coverPhoto = action.payload
        },
        setOtherPhotos: ( state, action ) => {
            state.otherPhotos.push(action.payload)
        },
        setAmenities: ( state, action ) => {
            state.amenities = action.payload
        },
        setIdentity: ( state, action ) => {
            state.IdCardNumber = action.payload
        },
        setIdPhoto: ( state, action ) => {
            state.IdPhoto.push(action.payload)
        },
        setPricing: ( state, action ) => {
            state.pricing.push(action.payload)
        },
        setExtraFees: ( state, action ) => {
            state.extraFees.push(action.payload)
        },
        setHouseRules: ( state, action ) => {
            state.houseRules = action.payload
        },
        setHouseArrangement: ( state, action ) => {
            state.houseArrangement = action.payload
        },
        removePricing: ( state, action ) => {
            state.pricing = state.pricing.filter((item: any) => item.id !== action.payload)
        },
        removeExtraFees: ( state, action ) => {
            state.extraFees = state.extraFees.filter((item: any) => item.id !== action.payload)
        },
        removeRules: ( state, action ) => {
            if ( action.payload ) {
                state.houseRules = ''
            }
        },
        removeArrangements: ( state, action ) => {
            if ( action.payload ) {
                state.houseArrangement = ''
            }
        },
        addAmenity: ( state, action ) => {
            state.amenities.push(action.payload)
        },
        removeAmenity: ( state, action ) => {
            state.amenities = state.amenities.filter((item) => item !== action.payload)
        },
        resetReducer: ( state ) => {
            return initialState
        }
    }
})

export const { setTitleAndDescription, setAmenities, setCategory, setCoverPhoto, setOtherPhotos, setLocation, setIdentity, setHouseRules, setHouseArrangement, setPricing, removePricing, removeArrangements, removeRules, addAmenity, removeAmenity, resetReducer, setIdPhoto, setExtraFees, removeExtraFees } = propertySlice.actions

export default propertySlice.reducer