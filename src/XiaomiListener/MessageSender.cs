using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Devices.Client;

namespace XiaomiListener
{
    public class MessageSender
    {
        private readonly DeviceClient _deviceClient;
        private const float HumidityThreshold = 80.0f;

        public MessageSender(DeviceClient deviceClient)
        {
            _deviceClient = deviceClient ?? throw new ArgumentNullException(nameof(deviceClient));
        }

        public async Task SendTest()
        {
            var temperature = 20.2f;
            var humidity = 80.5f;
            var pressure = 1085.5f;
            var dataBuffer = $"{{\"temperature\":{temperature},\"humidity\":{humidity},\"pressure\":{pressure}}}";
            var eventMessage = new Message(Encoding.UTF8.GetBytes(dataBuffer));
            eventMessage.Properties.Add("humidityAlert", (humidity > HumidityThreshold) ? "true" : "false");

            // _log.WriteLine("\t{0}> Sending message: {1}, Data: [{2}]", DateTime.Now.ToUniversalTime(), dataBuffer);

            await _deviceClient.SendEventAsync(eventMessage).ConfigureAwait(false);
        }
    }
}
