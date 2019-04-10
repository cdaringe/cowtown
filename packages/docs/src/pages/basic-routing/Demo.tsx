import { Runkit } from '../../components/Runable'
import { basicRoutingServer } from '../../demoSourceAsStrings/demoSource'
import React from 'react'

export const Demo = () => <Runkit source={basicRoutingServer} />
