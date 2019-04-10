import { Runkit } from '../../components/Runable'
import { applicationConfigServer } from '../../demoSourceAsStrings/demoSource'
import React from 'react'

export const Demo = () => <Runkit source={applicationConfigServer} />
