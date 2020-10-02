import React from 'react'
import { Card, CardBody } from 'reactstrap'
function Notes() {
    return (
        <>
            <span className="center-item" style={{ fontSize: "1.5em" }}>
                Find some intresting facts and useful content curated by experts.
          </span>
            <Card
                style={{
                    backgroundColor: "#9052ff",
                    borderRadius: "1em",
                    marginTop: '2em'
                }}
            >
                <CardBody>
                    <span className="text-white" style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Akbar</span><br />
                    <span className="text-white" style={{ fontSize: '1em' }}>A strong personality and a successful general, Akbar gradually enlarged the Mughal Empire to include much of the Indian subcontinent. His power and influence, however, extended over the entire subcontinent because of Mughal military, political, cultural, and economic dominance. To unify the vast Mughal state, Akbar established a centralised system of administration throughout his empire and adopted a policy of conciliating conquered rulers through marriage and diplomacy. To preserve peace and order in a religiously and culturally diverse empire, he adopted policies that won him the support of his non-Muslim subjects. Eschewing tribal bonds and Islamic state identity, Akbar strove to unite far-flung lands of his realm through loyalty, expressed through an Indo-Persian culture, to himself as an emperor.</span><br />

                </CardBody>
            </Card>
        </>
    )
}
export default Notes;