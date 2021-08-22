import { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
class Products extends Component {
    showInfo(char) {
        if (char.simp === true) {
            return <button className="btn btn-primary" type="button">Simp</button>
        }
        else {
            return <button className="btn btn-danger" type="button">Simp</button>
        }
    }
    render() {
        var chars = [
            {
                src: "https://sailormoonvietnam.files.wordpress.com/2017/09/tumblr_nroz2pfsga1r89q2no3_500.png",
                name: "Ami Mizuno",
                desc: "My goddess",
                simp: true
            },
            {
                src: "https://sailormoonvietnam.files.wordpress.com/2020/12/eowshsbuuaagnhk.jpg?w=584",
                name: "Usagi Tsukino",
                desc: "My queen",
                simp: false
            },
            {
                src: "https://lh3.googleusercontent.com/proxy/R8Eb4QuhnT0lOuSnPUHY785srNg_iha7lszvK2n8N2V8bt12hCGa22pQtwK23v55kMaRcQxhdlVb14EQNjtBEK3aNwTrOIXkbCGA0c4u8vuKNPO9ExeWG-l4rTfv70CflB_6Xr5OM1GLQkmf8a1KNNc-KXzev5D58_wE6wo-cg",
                name: "Anio Minako",
                desc: "My princess",
                simp: true
            },
            {
                src: "https://lh3.googleusercontent.com/proxy/FUj5LNjclFhtDJ6BrjBQkcofUNSJeigBMyA2VE5q-C_FFkp_I-4SiJ5drPhbgjulQmQacAOIjxdxyDpEUyaMO13--5uRtLP9WghjY9MLexRvFEWIBM4ceZuvkqEG5yfOPWt4H3JCrDGBpHN5kr-icSiyWj6kJfdoItg7da7-5s9yWtEalKg4JkjnmHnvbIYRtjSyrAw",
                name: "Kino Makoto",
                desc: "My lady",
                simp: true
            },
            {
                src: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7de5d45b-01bc-42f6-83a8-0d5bb60d0bcf/dedzass-4aa97392-bb63-4960-9ee2-c5eb385bfb96.jpg/v1/fill/w_1280,h_2828,q_75,strp/eternal_sailor_mars_by_smgallery9_dedzass-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjgyOCIsInBhdGgiOiJcL2ZcLzdkZTVkNDViLTAxYmMtNDJmNi04M2E4LTBkNWJiNjBkMGJjZlwvZGVkemFzcy00YWE5NzM5Mi1iYjYzLTQ5NjAtOWVlMi1jNWViMzg1YmZiOTYuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.sE8ZW8uJ7RNyzThnq9gDijywMx2G7gvrHGAq8kTkWGE",
                name: "Rei Hino",
                desc: "My mistress",
                simp: false
            }
        ]
        var showChar = chars.map((char, index) => {
            return  <Col className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="card" style={{ width: '18rem' }}>
                            <img className="card-img-top" src={char.src} alt="profile" />
                            <div className="card-body">
                                <h5 className="card-title">{char.name}</h5>
                                <p className="card-text">{char.desc}</p>
                                {this.showInfo(char)}
                            </div>
                        </div>
                    </Col>
        })
        return (
            <Row>
                {showChar}
            </Row> 
        );
    }
}
export default Products;