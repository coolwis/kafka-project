<template>
  <div>
    <h1>{{ msg }}</h1>
    <!-- <h2>Kafka, Hadoop PipeLines</h2> -->
    <!-- <img src="../assets/connect-platform.png"> -->
    <ul>
      <li>
        <img src="../assets/kafka-pipeline.png" />
      </li>
    </ul>
    <!-- <h2>Kafka PipeLine</h2> -->
    <ul>
      <li>
        <div>{{ responseData }}</div>
        <div></div>
      </li>
    </ul>

    <h1>[1] HDFS3</h1>
    <ul>
      <li>
        <a
          href="http://ec2-3-36-37-170.ap-northeast-2.compute.amazonaws.com:9870/explorer.html#/"
          target="_blank"
        >
          Hadoop Data File 조회
        </a>
      </li>
    </ul>
    <br />

    <h1>[2] kafka Rest Api</h1>
    <!-- <h4> <font color="red">(Cross Domain (CORS) 설정 이슈로 수정 중입니다.)</font></h4> -->
    <br />
    <ul class="list">
      <li style="text-align: left">
        <font color="blue"> (1) Kafka Topic List 조회 </font>
        <br />
        <select>
          <option
            :key="option.value"
            v-for="option in selectBoxData"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>

        <input
          type="text"
          size="35"
          placeholder="http://3.36.37.170:8082/topics"
          value="http://3.36.37.170:8082/topics"
        />
        <button name="btnSend" @click="getTopicList">Request</button>
        <br /><br />
        <span> Response Data </span>
        <br />
        <br />
        <!-- <div class="item-line" v-bind:key="item" v-for="item in topics">
          <span class="item-id">{{item}}</span>
        </div> -->

        <hr />

        <json-viewer
          :value="topics"
          :expand-depth="5"
          copyable
          boxed
          sort
        ></json-viewer>
      </li>
      <br />
      <br />
      <br />
      <li style="text-align: left">
        <font color="blue"> (2) Kafka connector-plugins List 조회 </font>
        <br />

        <select>
          <option
            :key="option.value"
            v-for="option in selectBoxData"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>

        <input
          type="text"
          size="35"
          placeholder="http://3.36.37.170:8083/connector-plugins"
          value="http://3.36.37.170:8083/connector-plugins"
        />
        <button name="btnSend" @click="getConnectorList">Request</button>
        <br /><br />
        <span class="item-id"> Response Data </span>
        <br />
        <br />
        <!-- <div class="item-line" v-bind:key="item" v-for="item in connectors">
          <span class="item-id">{{item}}</span>
        </div> -->

        <hr />

        <json-viewer
          :value="connectors"
          :expand-depth="5"
          copyable
          boxed
          sort
        ></json-viewer>
      </li>
      <br />
      <br />
      <br />
      <li style="text-align: left">
        <font color="blue"> (3) Kafka Topic 생성 </font>
        <br />

        <select>
          <option
            :key="option.value"
            v-for="option in selectBoxData"
            :selected="option.value == 'POST'"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>

        <input
          type="text"
          size="24"
          placeholder=""
          value="http://3.36.37.170:8082/topics/"
        />
        <input
          type="text"
          id="newtopicName"
          v-model="topicName"
          size="7"
          :required="true"
          placeholder="생성할 Topic Name"
          value=""
        />
        <br /><label>Content-Type:application/vnd.kafka.avro.v2+json</label>
        <button name="btnSend" @click="createTopic">Request</button>

        <br />
        <br />
        <span class="item-id"> Response Data </span>
        <br />
        <br />

        <hr />

        <json-viewer
          :value="resTopicCreate"
          :expand-depth="5"
          copyable
          boxed
          sort
        ></json-viewer>
      </li>
      <br />
      <br />
      <br />
      <li style="text-align: left">
        <font color="blue"> (4) Kafka Sink Connector (HDFS3) 생성 </font>
        <br />

        <select>
          <option
            :key="option.value"
            v-for="option in selectBoxData"
            :selected="option.value == 'POST'"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>

        <input
          type="text"
          size="26"
          placeholder=""
          value="http://3.36.37.170:8083/connectors"
        /><input
          type="text"
          id="newConnName"
          v-model="connectorName"
          size="14"
          :required="true"
          placeholder="생성할 Connector Name"
          value=""
        />
        <br /><label>TopicName:</label
        ><input
          type="text"
          id="connTopicName"
          v-model="connTopicName"
          size="10"
          :required="true"
        />

        <button name="btnSend" @click="createConnector">Request</button>
        <br />
        <br />

        <span>Sink Properties (Sample)</span><br />
        <textarea cols="58" rows="17" readonly>
         {
          "name": "[Sink Connector 이름]",
              "config": {
                  "connector.class": "io.confluent.connect.hdfs3.Hdfs3SinkConnector",
                  "tasks.max": "10",
                  "topics": "[생성된 토픽이름]",
                  "hdfs.url": "hdfs://namenode1:9000",
                  "hadoop.conf.dir": "/home/ubuntu/hadoop/etc/hadoop",
                  "hadoop.home": "/home/ubuntu/hadoop",
                  "flush.size": "3",
                  "rotate.interval.ms": "1000",
                  "value.converter":"value.converter":"io.confluent.connect.avro.AvroConverter",
                  "value.converter.schema.registry.url":"http://localhost:8081"
              }
          }
        </textarea>

        <br /><br />

        <span class="item-id"> Response Data </span>
        <hr />

        <json-viewer
          :value="resConnectorCreate"
          :expand-depth="5"
          copyable
          boxed
          sort
        ></json-viewer>
      </li>
      <br />
      <br />
      <br />
      <li style="text-align: left">
        <font color="blue"> (5) Publish Kafka Topic Data </font>
        <br />
        <select>
          <option
            :key="option.value"
            v-for="option in selectBoxData"
            :selected="option.value == 'POST'"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>

        <input
          type="text"
          size="27"
          placeholder=""
          value="http://3.36.37.170:8082/topics/"
        />
        <input
          type="text"
          id="topicName2"
          v-model="topicName"
          size="7"
          :required="true"
          placeholder="Topic Name"
          value=""
        />
        <br /><label>Content-Type:application/vnd.kafka.avro.v2+json</label>
        <button name="btnSend" @click="publishTopicData">Request</button>

        <hr />
        <label>Value Schema (Avro format)</label><br />
        <textarea
          id="valueSchema"
          cols="58"
          rows="7"
          v-model="valueSchema"
          placeholder='{"name":"int","type": "int"}'
        >
        </textarea>
        <br />

        <label>Records</label><br />
        <textarea id="records" cols="58" rows="7" v-model="records"> </textarea>
        <br /><br />
        <span class="item-id"> Response Data </span>
        <hr />

        <json-viewer
          :value="resPostTopic"
          :expand-depth="5"
          copyable
          boxed
          sort
        ></json-viewer>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

const config = {
  baseUrl: "http://ec2-3-36-37-170.ap-northeast-2.compute.amazonaws.com:8082",
  connectorUrl:
    "http://ec2-3-36-37-170.ap-northeast-2.compute.amazonaws.com:8083",
};

export default {
  name: "HelloWorld",
  components: {
    // vueJsonEditor
  },
  data() {
    return {
      msg: "Kafka Connector를 활용한 Hdfs(Hadoop) Sink Api Tester",
      responseData: "",
      resTopicCreate: {},
      selectBoxData: null,
      topics: [],
      connectors: [],
      topicName: "",
      connectorName: "",
      resConnectorCreate: {},
      connTopicName: "",
      resPostTopic: {},
      valueSchema: {},
      records: [],
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData: function () {
      this.selectBoxData = [
        { value: "GET", text: "GET" },
        { value: "POST", text: "POST" },
        { value: "PUT", text: "PUT" },
        { value: "DELETE", text: "DELETE" },
      ];

      this.valueSchema = JSON.stringify({ name: "int", type: "int" });

      this.records = JSON.stringify([
        {
          value: 12,
        },
        {
          value: 24,
          partition: 1,
        },
      ]);
    },
    //Vue.use(AxiosPlugin)
    getAxiosCors: function () {
      const options = {
        url:
          "http://ec2-3-36-37-170.ap-northeast-2.compute.amazonaws.com:8082/topics",
        method: "GET",
        data: {
          // email: 'user@example.com',
          // password: 'pasw0rd'
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers":
            "X-Requested-With, Content-Type, Authorization",
        },
      };

      this.$axios(options)
        .then((res) => {
          console.log("suceeded!");
          console.log(res);
        })
        .catch((err) => {
          console.error("failed." + err);
        });
    },

    //main.js -> Vue.prototype.$http =axios
    getGobalAxios: function () {
      this.$http
        .get(`${config.baseUrl}/topics`, {
          headers: {},
        })
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          console.log("error:", e);
        });
    },
    getTopicList: function () {
      this.topics = [];
      this.$axios
        .get(
          `${config.baseUrl}/topics`,
          {
            // data: this.data,
          },
          {}
        )
        .then((res) => {
          console.log("Success!!!!");
          console.log(res);
          this.topics = res.data;
        })
        .catch((err) => {
          console.error("error !!!");
          console.error(err);
        });
    },
    getTopicInfo: function (topicName, responseTarget) {
      this.topics = [];
      let url = `${config.baseUrl}/topics/`;
      url += topicName;
      this.$axios
        .get(
          url,
          {
            // data: this.data,
          },
          {}
        )
        .then((res) => {
          // console.log(JSON.stringify(res.data))
          //  return res.data
          responseTarget = res.data;
        })
        .catch((err) => {
          // return err
          console.log(err);
        });
    },
    getConnectorList: function () {
      this.connectors = [];

      //import AxiosPlugin from 'vue-axios-cors' -> this.$axios
      this.$axios
        .get(
          `${config.connectorUrl}/connector-plugins`,
          {
            // data: this.data,
          },
          {
            // withCredentials: true,
          }
        )
        .then((res) => {
          console.log("Success!!!!");
          console.log(res);
          this.connectors = res.data;
        })
        .catch((err) => {
          console.error("error !!!");
          console.error(err);
        });
    },

    createTopic: function () {
      if (!this.topicName) {
        alert("생성할 토픽이름을 입력하세요");
        return;
      }
      this.resTopicCreate = {};
      var url = `${config.baseUrl}/topics/`;
      url += this.topicName;

      let dataJsonFormat = [{ value: { temp: "temp" } }];

      let dataAvro = [
        {
          value: 12,
        },
        {
          value: 24,
          partition: 1,
        },
      ];

      // const qs = require('qs');
      const HTTP = axios.create({
        baseURL: url,
        headers: {
          // 'Content-Type': 'application/vnd.kafka.json.v2+json',
          "Content-Type": "application/vnd.kafka.avro.v2+json", //avro format
          // 'Accept': 'application/vnd.kafka.v2+json'
          // 'Accept' : 'application/vnd.kafka.avro.v1+json, application/vnd.kafka.v1+json, application/vnd.kafka+json, application/json'
        },
      });

      HTTP.post("", {
        //avro format
        value_schema: '{"name":"int","type": "int"}',
        records: dataAvro,
        // 'records':dataJsonFormat  //json format
      })
        .then((response) => {
          // console.log('Response: ' + JSON.stringify(response))
          // console.log('Response: ' + JSON.stringify(response.data))
          alert("Success Create Topic!");
          this.getTopicInfo(this.topicName, this.resTopicCreate);
          console.log(this.resTopicCreate);
        })
        .catch((e) => {
          console.log("Error: " + e);
          alert("fail to Create Topic!");
          this.resTopicCreate = e.data.message;
        });
    }, //end function

    publishTopicData: function () {
      if (!this.topicName) {
        alert("토픽이름을 입력하세요");
        return;
      }
      this.resPostTopic = {}
      var url = `${config.baseUrl}/topics/`
      url += this.topicName

      let dataAvro = this.records;
      let valueSchema = this.valueSchema;

      // const qs = require('qs');
      const HTTP = axios.create({
        baseURL: url,
        headers: {
          "Content-Type": "application/vnd.kafka.avro.v2+json", //avro format
        },
      });

      HTTP.post("", {
        //avro format
        value_schema: valueSchema,
        records: JSON.parse(dataAvro),
      })
        .then((response) => {
          alert("Success Publish Topic!");
          this.resPostTopic=response.data
          // this.getTopicInfo(this.topicName, this.resPostTopic);
        })
        .catch((e) => {
          console.log("Error: " + e);
          alert("fail to Create Topic!");
          this.resPostTopic = e;
        });
    }, //end function

    createConnector: function () {
      if (!this.connectorName) {
        alert("생성할 Connector이름을 입력하세요");
        return;
      }

      if (!this.connTopicName) {
        alert("Topic 이름을 입력하세요");
        return;
      }

      this.resConnectorCreate = {};
      var url = `${config.connectorUrl}/connectors/`;

      let name = this.connectorName;

      let configJson = "";
      configJson += "{";
      configJson +=
        '"connector.class": "io.confluent.connect.hdfs3.Hdfs3SinkConnector",';
      configJson += '"tasks.max": "3",';
      configJson += '"topics":"' + this.connTopicName + '",';
      configJson += '"hdfs.url": "hdfs://namenode1:9000",';
      configJson += '"hadoop.conf.dir": "/home/ubuntu/hadoop/etc/hadoop",';
      configJson += '"hadoop.home": "/home/ubuntu/hadoop",';
      configJson += '"flush.size": "3",';
      configJson += '"rotate.interval.ms": "1000",';
      // configJson +=            '"key.converter":"io.confluent.connect.avro.AvroConverter",'
      configJson +=
        '"value.converter":"io.confluent.connect.avro.AvroConverter",';
      // configJson +=            '"value.converter":"org.apache.kafka.connect.json.JsonConverter",'

      // configJson +=            '"key.converter":"org.apache.kafka.connect.storage.StringConverter",'
      // configJson +=            '"key.converter":"io.confluent.connect.json.JsonSchemaConverter",'
      // configJson +=            '"key.converter":"org.apache.kafka.connect.json.JsonConverter",'
      // configJson +=            '"key.converter.schema.registry.url":"http://localhost:8081",'
      // configJson +=            '"value.converter":"io.confluent.connect.json.JsonSchemaConverter",'
      configJson +=
        '"value.converter.schema.registry.url":"http://localhost:8081"';
      configJson += "}";

      // let records= JSON.stringify(data)
      // const qs = require('qs');
      const HTTP = axios.create({
        baseURL: url,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      HTTP.post("", {
        name: name,
        config: JSON.parse(configJson),
      })
        .then((response) => {
          alert("Success Create Connector!");
          console.log(response);
          this.resConnectorCreate = response.data;
        })
        .catch((e) => {
          console.log("Error: " + e);
          this.resConnectorCreate =
            '{"error":"Connector Create Error!!!"},' + e;
        });
    }, //end function
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  /* text-align:left; */
  list-style-type: disc;
  /* align-content: center; */
  /* align-items: center; */
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
