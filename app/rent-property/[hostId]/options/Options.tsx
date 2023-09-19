'use client'

import React, { useEffect, useState } from 'react'
import { Be_Vietnam_Pro } from "next/font/google"
import { useRouter } from 'next/navigation'

import { SafeUser } from '@/app/types'
import { useDispatch, useSelector } from 'react-redux'
import { removeArrangements, removeExtraFees, removePricing, removeRules, setExtraFees, setHouseArrangement, setHouseRules, setPricing } from '@/app/reducers/property/propertySlice'
import { TiDelete } from 'react-icons/ti'
import { v4 as uuid } from 'uuid'

interface OptionProps {
    currentUser?: SafeUser | null
}

const Heading = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '700'
  })
  
const SubHeading = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '500'
})
  
const Subtitle = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
})

const Options: React.FC<OptionProps> = ({ currentUser }) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const { pricing, houseRules, houseArrangement, extraFees } = useSelector((state: any) => state.property)

    const initialPricingDetails = {
        id: '',
        price: '',
        unitType: '',
        rentalPeriod: '',
    }

    const initialExtraFeeDetails = {
        id: '',
        feeName: '',
        amount: '',
    }

    const [pricingDetails, setPricingDetails] = useState(initialPricingDetails)
    const [extraFee, setExtraFee] = useState(initialExtraFeeDetails)
    const [rules, setRules] = useState('')
    const [isRulesEdit, setIsRulesEdit] = useState(false)
    const [arrangement, setArrangement] = useState('')
    const [isArrangementEdit, setIsArrangementEdit] = useState(false)
    const [selectedValue, setSelectedValue] = useState('')

    const onNext = (e: any) => {
        e.preventDefault()
        router.push(`/rent-property/${currentUser?.id}/amenities`)
    }

    const onBack = (e: any) => {
        e.preventDefault()
        router.push(`/rent-property/${currentUser?.id}/location`)
    }

    const onAddToPriceList = () => {
        pricingDetails.rentalPeriod = selectedValue
        pricingDetails.id = uuid()
        dispatch(setPricing(pricingDetails))
        setPricingDetails({ id: '', price: '', unitType: '', rentalPeriod: ''})
        console.log(pricingDetails)
    }

    const onAddExtraFees = () => {
        extraFee.id = uuid()
        dispatch(setExtraFees(extraFee))
        setExtraFee(initialExtraFeeDetails)
    }

    const onAddRules = () => {
        dispatch(setHouseRules(rules))
        setHouseRules('')
    }

    const onAddArrangement = () => {
        dispatch(setHouseArrangement(arrangement))
        setHouseArrangement('')
    }

    const onArrangementEdit = () => {
        setIsArrangementEdit(true)
    }

    useEffect(() => {
        onArrangementEdit()
    }, [isRulesEdit])

    console.log(isRulesEdit)

  return (
    <div className='flex flex-col relative mx-auto'>
        <div className='max-w-screen-xl py-[100px] md:pt-[100px] lg:pt-[100px] gap-5 flex flex-col justify-center items-center'>
            <div className='flex md:flex-row relative flex-col gap-[50px] w-full'>
                <div className='w-full h-full flex flex-col gap-3 overflow-y-auto'>
                    <div className='md:w-[85%] w-full gap-1 flex flex-col'>
                        <h1 className={`md:text-[30px] text-[28px] text-body text-left`}>
                            Rent details
                        </h1>
                        <p className={`text-[#959595] text-left text-[15px] leading-6 ${Subtitle.className}`}>
                            Write your price list for the various unit options( e.g 2 bedroom apartment, 4 bedroom apartment ) available for rent and their rental periods.
                        </p>
                    </div>
                    <div className='flex flex-col pt-2 gap-2 md:w-[50%] w-[80%]'>
                        <div className='w-full flex flex-col gap-1'>
                            <p className='text-[15px] text-[#202020]'>
                                Unit type 
                            </p>
                            <input onChange={(e: any) => setPricingDetails({ ...pricingDetails, unitType: e.target.value })} type="text" className='peer w-full p-3 font-light border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black bg-white border-neutral-300 pl-4' />
                        </div>
                        <div className='w-full flex flex-col gap-1 mt-2'>
                            <p className='text-[15px] text-[#202020]'>
                                Price
                            </p>
                            <div className='flex flex-row items-center border-[1px] rounded-md border-neutral-300 focus:border-black gap-2'>
                                <input type="number" onChange={(e: any) => setPricingDetails({ ...pricingDetails, price: e.target.value })} className='peer w-full md:[w-35%] p-3 font-light rounded-md outline-none border-[1px] border-[#ffff] transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black bg-white pl-4' />
                                <p className='text-[#959595] pr-3'>
                                    FCFA
                                </p>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-1 mt-2'>
                            <p className='text-[15px] text-[#202020]'>
                                Rental period 
                            </p>
                            <select value={selectedValue} onChange={(e: any) => setSelectedValue(e.target.value)} className='peer w-full p-3 font-light bg-white border-[1px] rounded-md outline-none transition border-neutral-300 disabled:opacity-70 disabled:cursor-not-allowed focus:border-black pl-4'>
                                <option value=""> </option>
                                <option value="year">year</option>
                                <option value="month">month</option>
                                <option value="week">week</option>
                                <option value="day">day</option>
                            </select>
                        </div>
                        <button onClick={onAddToPriceList} className={`rounded-lg text-md mt-5 transition duration-500 ease-in-out bg-[#202020] text-white px-6 py-3 ${Subtitle.className}`}>
                            Add to price list
                        </button>
                    </div>
                    <hr className='mt-5' />
                    <div className='flex flex-col pt-2 gap-2'>
                        <div className='md:w-[85%] w-full gap-1 flex flex-col'>
                            <h1 className={`md:text-[30px] text-[28px] text-body text-left`}>
                                Any extra fee ?
                            </h1>
                            <p className={`text-[#959595] text-left text-[15px] leading-6 ${Subtitle.className}`}>
                                Write your price list for the various unit options( e.g 2 bedroom apartment, 4 bedroom apartment ) available for rent and their rental periods.
                            </p>
                        </div>
                        <div className='flex flex-col gap-1 md:w-[50%] w-[80%] mt-3'>
                            <p className='text-[15px] text-[#202020]'>
                                Fee
                            </p>
                            <input onChange={(e: any) => setExtraFee({ ...extraFee, feeName: e.target.value })} type="text" className='peer w-full p-3 font-light border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black bg-white border-neutral-300 pl-4' />
                        </div>
                        <div className='flex flex-col gap-1 mt-2 md:w-[50%] w-[80%]'>
                            <p className='text-[15px] text-[#202020]'>
                                Amount
                            </p>
                            <div className='flex flex-row items-center border-[1px] rounded-md border-neutral-300 focus:border-black gap-2'>
                                <input type="number" onChange={(e: any) => setExtraFee({ ...extraFee, amount: e.target.value })} className='peer w-full md:[w-35%] p-3 font-light rounded-md outline-none border-[1px] border-[#ffff] transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black bg-white pl-4' />
                                <p className='text-[#959595] pr-3'>
                                    FCFA
                                </p>
                            </div>
                        </div>
                        <button onClick={onAddExtraFees} className={`rounded-lg md:w-[50%] w-[80%] text-md mt-5 transition duration-500 ease-in-out bg-[#202020] text-white px-6 py-3 ${Subtitle.className}`}>
                            Add to price list
                        </button>
                    </div>
                    <hr className='mt-5' />
                    <div className='mt-1 flex flex-col gap-3'>
                        <h1 className='text-[28px]'>
                            House Arrangement
                        </h1>
                        <textarea defaultValue={ isArrangementEdit ? houseArrangement : '' } placeholder='how is your house(s) arranged ?' onChange={(e: any) => setArrangement(e.target.value)} cols={5} rows={5} className='peer w-full p-4 pt-4 md:pt-4 font-light bg-white border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-black border-neutral-300'></textarea>
                        <button onClick={onAddArrangement} className={`rounded-lg text-md mt-5 transition duration-500 ease-in-out bg-[#202020] text-white px-6 py-3 ${Subtitle.className}`}>
                            Add to price list
                        </button>
                    </div>
                    <hr className='mt-5' />
                    <div className='mt-1 flex flex-col gap-3'>
                        <h1 className='text-[28px]'>
                            House Rules
                        </h1>
                        { isRulesEdit ? (
                            <textarea defaultValue={ houseRules } placeholder='What are your rules ?' onChange={(e: any) => setRules(e.target.value)} cols={5} rows={5} className='peer w-full p-4 pt-4 md:pt-4 font-light bg-white border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-black border-neutral-300'></textarea> 
                        ) : (
                            <textarea placeholder='What are your rules ?' onChange={(e: any) => setRules(e.target.value)} cols={5} rows={5} className='peer w-full p-4 pt-4 md:pt-4 font-light bg-white border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-black border-neutral-300'>
                            </textarea>
                        )}
                        <button onClick={onAddRules} className={`rounded-lg text-md mt-5 transition duration-500 ease-in-out bg-[#202020] text-white px-6 py-3 ${Subtitle.className}`}>
                            Add to price list
                        </button>
                    </div>
                </div>
                <div className='md:w-[860px] md:h-[600px] bg-[#fefefe] overflow-y-auto md:sticky md:top-[100px] w-full h-[600px] border-[1px] border-[#c0c0c0] gap-5 p-[30px] flex flex-col rounded-md'>
                    <h1 className='md:text-2xl text-lg text-left'>
                        Rent
                    </h1>
                    {pricing.map((item: any) => (
                    <div key={item.id} className='flex flex-row items-center md:justify-between text-neutral-500 gap-5 md:gap-10'>
                        <div className='flex flex-col gap-3'>
                            <p className={`md:text-[15px] text-sm ${Subtitle.className}`}>
                                {item.unitType}
                            </p>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <p className={`md:text-[15px] text-sm truncate ${Subtitle.className}`}>
                                XAF {item.price}/{item.rentalPeriod}
                            </p>
                            <TiDelete onClick={() => dispatch(removePricing(item.id))} className='md:text-[25px] text-[25px] text-[#c04040] cursor-pointer' />
                        </div>
                    </div>
                    ))}
                    <hr />
                    <h1 className='md:text-2xl text-lg text-left'>
                        Extra fees
                    </h1>
                    {extraFees.map((item: any) => (
                    <div key={item.id} className='flex flex-row items-center md:justify-between text-neutral-500 gap-5 md:gap-10'>
                        <div className='flex flex-col gap-3'>
                            <p className={`md:text-[15px] text-sm ${Subtitle.className}`}>
                                {item.feeName}
                            </p>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <p className={`md:text-[15px] text-sm truncate ${Subtitle.className}`}>
                                XAF {item.amount}
                            </p>
                            <TiDelete onClick={() => dispatch(removeExtraFees(item.id))} className='md:text-[25px] text-[25px] text-[#c04040] cursor-pointer' />
                        </div>
                    </div>
                    ))}
                    <hr />
                    <div className='w-full flex flex-col gap-3'>
                        <div className='flex flex-row md:gap-10 gap-5 items-center'>
                            <h1 className='md:text-2xl text-lg'>
                                Arrangement
                            </h1>
                            {houseArrangement.length != 0 ? (
                            <div className='flex flex-row gap-3'>
                                <p onClick={onArrangementEdit} className='text-[11px] md:text-[13px] underline text-[#202020] cursor-pointer'>
                                    edit
                                </p>
                                <p onClick={() => dispatch(removeArrangements(true))} className='text-[11px] md:text-[13px] underline text-[#9e2e2e] cursor-pointer'>
                                    remove
                                </p>
                            </div>
                            ): null}
                        </div>
                        <p className={`text-[14px] text-neutral-500 leading-8 ${Subtitle.className}`}>
                            {houseArrangement}
                        </p>
                    </div>
                    <hr />
                    <div className='w-full flex flex-col'>
                        <div className='flex flex-row md:gap-10 gap-5 items-center'>
                            <h1 className='md:text-2xl text-lg'>
                                Rules
                            </h1>
                            {houseRules.length != 0 ? (
                            <div className='flex flex-row gap-3'>
                                <p onClick={() => setIsRulesEdit(true)} className='text-[13px] underline text-[#202020] cursor-pointer'>
                                    edit
                                </p>
                                <p onClick={() => dispatch(removeRules(true))} className='text-[13px] underline text-[#9e2e2e] cursor-pointer'>
                                    remove
                                </p>
                            </div>
                            ): null}
                        </div>
                        <p className={`text-[15px] text-neutral-500 leading-8 ${Subtitle.className}`}>
                            {houseRules}
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center w-full py-5 md:px-[100px] px-5 fixed bottom-0 z-10 bg-[#f5f5f5]'>
                <button onClick={onBack} className={`rounded-lg border-[1.5px] border-[#202020b5] text-md bg-[#f5f5f5] transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-slate-900 to-gray-700 hover:text-white text-body px-6 py-3 ${Subtitle.className}`}>
                    Back
                </button>
                <button onClick={onNext} className={`rounded-lg text-md transition duration-500 ease-in-out bg-[#3AB0FF] hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-[#3AB0FF] to-blue-500 text-white px-6 py-3 ${Subtitle.className}`}>
                    Next
                </button>
            </div>
        </div>  
    </div>
  )
}

export default Options