import React, { useState,useEffect } from "react";
import { Link,NavLink } from "react-router-dom";

import { Outlet } from "react-router-dom";


export default function BathroomEl(Bathroom){

    const {
        sourceid,
        address,
        lat,
        lng,
        name,
        rating,
        content,
        photo,
        wheelchair,
        unisex,
        emergencyCord,
        emergencyButton,
        petFriendly,
        requiresKey,
        handDryer,
        feminineProducts,
        toiletCovers,
        bidet,
        singleStall,
        multipleStall,
        changingTable,
        trashCan,
        goodFlooring,
        airFreshener,
        automatic,
        coatHook,
        brailleSign,
        hotWater,
        firstAid,
        sharpsDisposal,
      } = Bathroom;
      
    return (
    <>

        <p> bathroom address</p>

    </>
      );

}